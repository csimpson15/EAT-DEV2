package com.ibm.awt.data;
 
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.persistence.CacheRetrieveMode;
import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaDelete;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Order;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.persistence.criteria.Selection;
import javax.persistence.criteria.Subquery;
import javax.ws.rs.core.MultivaluedMap;

import org.eclipse.persistence.config.HintValues;
import org.eclipse.persistence.config.QueryHints;

import com.google.gson.Gson;
import com.ibm.awt.service.OrderByDTO;
import com.ibm.awt.service.OrderDTO;
import com.ibm.websphere.security.auth.WSSubject;
import com.ibm.websphere.security.cred.WSCredential;

public abstract class DAOFacade<T> {

	private static Pattern opPattern = Pattern.compile("^(<>|>=|<=|>|<|~|#|_)");
	
	private Class<T> entityClass;
	
	CriteriaBuilder cb;
	CriteriaQuery<T> query;
	CriteriaQuery<Integer> numQuery;
	CriteriaDelete<T> deleteQuery;
	Subquery<T> subQuery;
	Subquery<Date> dateSubQuery;
	Root<T> root, deleteRoot, subRoot, numRoot, subDateRoot;
	List<Predicate> predicates, subPredicates;
	List<Order> orders;
	String uid, name;
	
	public DAOFacade(Class<T> entityClass) {
		this.entityClass = entityClass;
	}
	
	void initFacade() {
		EntityManager em = getEntityManager();
		cb = em.getCriteriaBuilder();
		query = cb.createQuery(entityClass);
		numQuery = cb.createQuery(Integer.class);
		deleteQuery = cb.createCriteriaDelete(entityClass);
		subQuery = query.subquery(entityClass);
		dateSubQuery = query.subquery(Date.class);
		root = query.from(entityClass);
		numRoot = numQuery.from(entityClass);
		deleteRoot = deleteQuery.from(entityClass);
		subRoot = subQuery.from(entityClass);
		subDateRoot = dateSubQuery.from(entityClass);
		predicates = new ArrayList<>();
		subPredicates = new ArrayList<>();
		orders = new ArrayList<>();

		try {
			WSCredential credential = WSSubject.getCallerSubject().getPublicCredentials(WSCredential.class).iterator().next();
			uid = credential.getUniqueSecurityName().substring(4, 13);
			name = credential.getSecurityName();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public List<T> find() {
		query.where(cb.and(predicates.toArray(new Predicate[predicates.size()])));
		query.orderBy(orders.toArray(new Order[orders.size()]));
		return getEntityManager().createQuery(query)
				.setHint(QueryHints.MAINTAIN_CACHE, HintValues.FALSE)
				.setFirstResult(0).setMaxResults(Integer.MAX_VALUE).getResultList();
	}
		
	public List<T> find(int first, int max) {
		query.where(cb.and(predicates.toArray(new Predicate[predicates.size()])));
		query.orderBy(orders.toArray(new Order[orders.size()]));
		return getEntityManager().createQuery(query)
				.setHint(QueryHints.CACHE_RETRIEVE_MODE, CacheRetrieveMode.BYPASS)
				.setFirstResult(first).setMaxResults(max).getResultList();
	}
	
	public List<T> findDistinct(int first, int max, Selection<?>... param) {
		query.select(cb.construct(entityClass, param)).distinct(true);
		query.where(cb.and(predicates.toArray(new Predicate[predicates.size()])));
		return getEntityManager().createQuery(query)
				.setHint(QueryHints.MAINTAIN_CACHE, HintValues.FALSE)
				.setFirstResult(first).setMaxResults(max).getResultList();
	}

	public List<Object> findDistinct(Selection<?>... args) {
		List<Selection<?>> selections = new ArrayList<>(Arrays.asList(args));
		CriteriaQuery<Object> objectQuery = cb.createQuery(Object.class);
		objectQuery.multiselect(selections).distinct(true);
		objectQuery.where(cb.and(predicates.toArray(new Predicate[predicates.size()])));
		return getEntityManager().createQuery(objectQuery).getResultList();
	}

	public T findFirst() {
		query.where(cb.and(predicates.toArray(new Predicate[predicates.size()])));
		List<T> result = getEntityManager().createQuery(query)
				.setHint(QueryHints.CACHE_RETRIEVE_MODE, CacheRetrieveMode.BYPASS)
				.getResultList();
		if( result.isEmpty() ) return null;
		else return result.get(0);
	}

	public Integer findMax(String attribute) {
		Expression<Integer> attributeFieldToCheck = numRoot.get(attribute);
		numQuery.select(cb.max(attributeFieldToCheck));
		numQuery.where(cb.and(predicates.toArray(new Predicate[predicates.size()])));
		return getEntityManager().createQuery(numQuery)
				.setHint(QueryHints.MAINTAIN_CACHE, HintValues.FALSE).getSingleResult();
	}

	public T findMaxDate(String columnToLimit) {
		dateSubQuery.select(cb.greatest(subDateRoot.<Date>get(columnToLimit)));
		dateSubQuery.where(cb.and(subPredicates.toArray(new Predicate[subPredicates.size()])));
		Predicate subQueryLimit = cb.equal(root.get(columnToLimit), dateSubQuery);
		predicates.add(subQueryLimit);
		query.where(cb.and(predicates.toArray(new Predicate[predicates.size()])));
		List<T> result = getEntityManager().createQuery(query)
				.setHint(QueryHints.MAINTAIN_CACHE, HintValues.FALSE).getResultList();
		if( result.isEmpty() ) return null;
		else return result.get(0);
	}
	
	public int delete() {
		deleteQuery.where(cb.and(predicates.toArray(new Predicate[predicates.size()])));
		return getEntityManager().createQuery(deleteQuery).executeUpdate();
	}
	
	public Object count() {
		CriteriaQuery<Object> objectQuery = cb.createQuery(Object.class);
		objectQuery.select(cb.count(root));
		objectQuery.where(cb.and(predicates.toArray(new Predicate[predicates.size()])));
		return getEntityManager().createQuery(objectQuery).getSingleResult();
	}
	
	public Object countDistinct(Expression<?> param) {
		CriteriaQuery<Object> objectQuery = cb.createQuery(Object.class);
		objectQuery.select(cb.countDistinct(param));
		objectQuery.where(cb.and(predicates.toArray(new Predicate[predicates.size()])));
		return getEntityManager().createQuery(objectQuery).getSingleResult();
	}
		
	void addPredicates(MultivaluedMap<String, String> map) {
		getPredicates(map, this.predicates, this.root);
	}
	
	public List<T> findSelection(Selection<?>... args) {
		List<Selection<?>> selections = new ArrayList<>(Arrays.asList(args));
		query.multiselect(selections);
		query.where(cb.and(predicates.toArray(new Predicate[predicates.size()])));
		query.orderBy(orders.toArray(new Order[orders.size()]));
		return getEntityManager().createQuery(query)
				.setHint(QueryHints.MAINTAIN_CACHE, HintValues.FALSE)
				.setFirstResult(0).setMaxResults(Integer.MAX_VALUE).getResultList();
	}
	
	void getPredicates(MultivaluedMap<String, String> map, List<Predicate> sourcePredicates, Root<?> sourceRoot) {
		for (Map.Entry<String, List<String>> entry : map.entrySet()) {
			
			List<Predicate> newPredicates = new ArrayList<>();
			
			String key = entry.getKey().replaceFirst("^&", "");
			
			for (String value : entry.getValue()) {				
				String op = "";
				Matcher matcher = opPattern.matcher(value);
				if (matcher.find()) {
					op = matcher.group(0);
					value = value.replaceFirst(op, "");
				}
											
				switch (op) {
				case "":
					newPredicates.add(cb.equal(sourceRoot.get(key), value));
					break;
				case "<>":
					newPredicates.add(cb.notEqual(sourceRoot.get(key), value));
					break;
				case ">=":
					newPredicates.add(cb.greaterThanOrEqualTo(sourceRoot.<String>get(key), value));
					break;
				case "<=":
					newPredicates.add(cb.lessThanOrEqualTo(sourceRoot.<String>get(key), value));
					break;
				case ">":
					newPredicates.add(cb.greaterThan(sourceRoot.<String>get(key), value));
					break;
				case "<":
					newPredicates.add(cb.lessThan(sourceRoot.<String>get(key), value));
					break;
				case "~":
					newPredicates.add(cb.like(cb.lower(sourceRoot.<String>get(key)), "%" + value.toLowerCase() + "%"));
					break;
				case "_":
					newPredicates.add(cb.isNull(sourceRoot.get(key)));
					break;
				case "#":
					newPredicates.add(cb.isNotNull(sourceRoot.get(key)));
					break;
				default:
					newPredicates.add(cb.equal(sourceRoot.get(key), value));
					break;
				}
			}

			if (key.equals(entry.getKey())) {
				sourcePredicates.add(cb.or(newPredicates.toArray(new Predicate[newPredicates.size()])));			
			} else {
				sourcePredicates.add(cb.and(newPredicates.toArray(new Predicate[newPredicates.size()])));
			}
		}
	}
	
	void addOrders(MultivaluedMap<String, String> map) {
		List<String> params = map.remove("orderBy");
		if (params != null && params.size() > 0) {
			OrderByDTO orderBy = new Gson().fromJson(params.get(0), OrderByDTO.class);
			for (OrderDTO order : orderBy.orders) {
				if (order.asc != null) {
					orders.add(cb.asc(cb.coalesce(root.get(order.asc), cb.literal(new BigDecimal(0)))));
				} else if (order.desc != null) {
					orders.add(cb.desc(cb.coalesce(root.get(order.desc), cb.literal(new BigDecimal(0)))));			
				}
			}
		} else {
			orders.add(cb.asc(root.get("etpId")));
		}
	}
	
	void addUidPredicate(Expression<?> uidExpression) {
		predicates.add(cb.and(cb.equal(uidExpression, uid)));
	}
	
	abstract EntityManager getEntityManager();
	
}