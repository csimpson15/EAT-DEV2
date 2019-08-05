	var services = {
		'userService': ['$http', '$rootScope', function($http, $rootScope) {
  			return {
	  			getCurrentUser: function() {
	  				if (!$rootScope.user)
	  				return $http.get('./rest/user')
	  				.then(function successCallback(response) {
	  					$rootScope.user = response.data;
	  				});
	  			}
	  		};
	  	}],
	  	'workflowService': ['$http', function($http) {
	  		return {
	  			fetchAll: function() {
	  				return $http.get('./rest/all')
	  				.then(function successCallback(response) {
	  					return response.data;
	  				}, function errorCallback(response) {
	  					return null;
	  				})
	  			},
	  			sendWorkflow: function(mainData) {
	  				console.log(mainData)
	  				return $http.put('./rest/all', mainData)
	  				.then(function successCallback(response) {
	  					return response.data;
	  				}, function errorCallback(response) {
	  					return null;
	  				})
	  			},
	  			countEe: function() {
	  				return $http.get('./rest/count/allee')
	  				.then(function successCallback(response) {
	  					return response.data;
	  				}, function errorCallback(response) {
	  					return null;
	  				});
	  			},
	  			fetchRequestDetail: function(params) {
	  				return $http.post('./rest/all/requestdetail', params)
	  				.then(function successCallback(response) {
	  					return response.data;
	  				}, function errorCallback(response) {
	  					return null;
	  				})
	  			}, 
	  			update: function(detail) {
	  				return $http.put('./rest/all/update', detail)
	  				.then(function sucessCallback(response) {
	  					return response.data;
	  				}, function errorCallback(response) {
	  					return null;
	  				})
	  			},
	  		}
	  	}],	
  	'fileService': ['$http', function($http) {
  		return {
  			uploadFile: function(file) {
  				return $http.post('./rest/all/uploadfile', file)
  				.then(function successCallback(response) {
  					return response.data;
  				}, function errorCallback(response) {
  					return null;
  				});
  			},
  			fileList: function() {
  				return $http.get('./rest/all/filelist')
  				.then(function successCallback(response) {
  					return response.data;
  				});
  			}
  		}
  	}]
};
	
