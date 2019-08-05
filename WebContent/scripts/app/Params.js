	function Params(scope) {
		this.scope = scope;
		this.params = {};
	}
	
	Params.prototype.addGeo = function(enforce) {
		if (this.scope.selections.geos) {
			this.params.geo = this.scope.selections.geos[0];
		} else if (enforce) {
			this.params.geo = '';
		}
		return this;
	};
	
	Params.prototype.addBrand = function(enforce) {
		if (this.scope.selections.brands) {
			this.params.brandCd = this.scope.selections.brands;
		} else if (enforce) {
			this.params.brandCd = '';
		}
		return this;
	};
	
	Params.prototype.addRegion = function(enforce) {
		if (this.scope.selections.regions) {
			this.params.rgnCd = this.scope.selections.regions;
		} else if (enforce) {
			this.params.rgnCd = '';
		}
		return this;
	};
	
	Params.prototype.addCountry = function(enforce) {
		if (this.scope.selections.cty) {
			this.params.ctyNum = this.scope.selections.cty;
		} else if (enforce) {
			this.params.ctyNum = '';
		}
		return this;
	};
	
	Params.prototype.addIot = function(enforce) {
		if (this.scope.selections.iot) {
			this.params.iot = this.scope.selections.iot;
		} else if (enforce) {
			this.params.iot = '';
		}
		return this;
	};

	
	Params.prototype.addImt = function(enforce) {
		if (this.scope.selections.imt) {
			this.params.imt = this.scope.selections.imt;
		} else if (enforce) {
			this.params.imt = '';
		}
		return this;
	};


	Params.prototype.addFilters = function(customFilters) {
		var opRegExp = '^(<>|>=|<=|>|<|~|#|_|)';
		var params = this.params;
		var fields = this.scope.fields;
		var filters = this.scope.filters;
		if (customFilters) filters = this.scope.customFilters;
		$.each(filters, function(key, filter) {
			if (filter) {
				
				var andOp = false;
				if (filter.search(/^&/) > -1) {
					andOp = true;
					filter = filter.replace(/^&/, '');
				}
				var field = fields.map[key];
				params[(andOp ? '&' : '') + key] = function() {
					var array = filter.split(',');
					
					$.each(array, function(i, value) {
						if (field.contains && value.search('^(<>|>=|<=|>|<|~|#|_)') == -1) array[i] = '~' + value;
						
						if (field.numeric || field.percent) {
							var regExp = new RegExp(opRegExp + '(-|)\\w{1,' + field.size + '}(\\.\\w{0,' + field.scale + '}|)$');
							if (value.search(regExp) == -1) array[i] = -0.01;
						} else {
							var regExp = new RegExp(opRegExp + '.{1,' + field.length + '}$');
							if (value.search(regExp) == -1) array[i] = '';
						}
					});
					
					return array;
				}();
			}
		});
		return this;
	};

	Params.prototype.addBounds = function() {		
		this.params.first = this.scope.query.first;
		this.params.max = this.scope.query.max;
		return this;
	};

	Params.prototype.addOrderBy = function() {
		if (this.scope.orders.length > 0) this.params.orderBy = {orders: this.scope.orders};		
		return this;
	};

	Params.prototype.addValStatus = function() {
		var selections = this.scope.selections;
		this.params.dplmtStatus = [];
		var dplmtStatus = this.params.dplmtStatus;
		$.each(selections.valStatuses, function(key, valStatus) {
			if (valStatus) dplmtStatus.push(key);
		});
		this.params.dplmtStatus = dplmtStatus;
		return this;
	};

	Params.prototype.fetchParams = function() {
		this.addBounds().addFilters().addValStatus();
		return this.params;
	};
	

	Params.prototype.fetchDetails = function() {
		this.addFilters(true);
		return this.params;
	};

	Params.prototype.countParams = function() {
		this.addFilters().addValStatus();
		return this.params;
	};

	Params.prototype.countValStatus = function() {
		this.addFilters();
		return this.params;
	};
