	var config = ['$routeProvider', '$locationProvider', 
	              function($routeProvider, $locationProvider, userService) {
		
		$locationProvider.hashPrefix('');
		$routeProvider.
		when('/awt', {
  	    	templateUrl: 'awt.html',
  			resolve: {
  				user: function(userService) {
  					return userService.getCurrentUser();
  				}
  			}
  	    })  	    
  	    .when('/approver-view', {
	    	templateUrl: 'approver-view.html',
			resolve: {
				user: function(userService) {
					return userService.getCurrentUser();
				}
			}
	    }) 	    
		.otherwise({
			redirectTo: '/awt'
	    });
	}];
