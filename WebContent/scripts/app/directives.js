	var directives = {
			freeze: ['$rootScope', function($rootScope) {
				return function(scope, element, attrs) {
					$rootScope.fixedFreezeEls[attrs.name] = element;
				};
			}],
			frozen: ['$rootScope', function($rootScope) {
				return function(scope, element, attrs) {
					$rootScope.fixedFrozenEls[attrs.name] = element;
				};
			}],
			scroll: ['$window', '$rootScope', function($window, $rootScope) {
		  		return function(scope, element, attrs) {
		  			angular.element($window).on('scroll', function() {

		  				if ( $('#data-table') && scope.useTableView && $('#fixAbleHeader')[0] ) {
		  					var elementPosition = $('#data-table').offset().top
					        var el = $('#fixAbleHeader')[0];

		  					if (elementPosition <= $($window).scrollTop()) {
			  					$rootScope.posFrozenEls();
					        	el.style.position = 'fixed';
					        	$rootScope.fixedHeader = true;
					        	$rootScope.$apply();
					        } else {
					        	el.style.position = 'relative';
					        	$rootScope.fixedHeader = false;
					        	$rootScope.$apply();
					        }
			  			}
		  			}),
		  			angular.element($window).on('resize', function() {
		  				if ( $rootScope.fixedHeader && scope.useTableView ) $rootScope.posFrozenEls();
		  			})
		  		};
		  	}],
		  	escToClose: ['$window', '$rootScope', function($window, $rootScope) {
		  		return function() {
		  			$window.addEventListener('keydown', function(event) {
		  				if($rootScope.openOverlays.length > 0 && event.keyCode == 27) {
		  					$rootScope.overlayHide();
		  				}
		  			})
		  		}
		  	}],
			recordNavigation: function() {
				console.log("anything");
				return {
					restrict: 'E',
					templateUrl: 'record-navigation.html?randVer=' + Math.random().toString(36).slice(2)
				}
			},
			overlayDetail: function() {
				return {
					restrict: 'E',
					templateUrl: 'overlay-detail.html?randVer=' + Math.random().toString(36).slice(2)
				}
			},
			overlayTipsTricks: function() {
				return {
					restrict: 'E',
					templateUrl: 'overlay-tips-tricks.html?randVer=' + Math.random().toString(36).slice(2)
				}
			},
			overlayTipsTricksGifs: function() {
				return {
					restrict: 'E',
					templateUrl: 'overlay-tips-tricks-gifs.html?randVer=' + Math.random().toString(36).slice(2)
				}
			},
			overlayViewControls: function() {
				return {
					restrict: 'E',
					templateUrl: 'overlay-view-controls.html?randVer=' + Math.random().toString(36).slice(2)
				}
			},
			overlayMassUpdate: function() {
				return {
					restrict: 'E',
					templateUrl: 'overlay-mass-update.html?randVer=' + Math.random().toString(36).slice(2)
				}
			},
			overlayExceptions: function() {
				return {
					restrict: 'E',
					templateUrl: 'overlay-exceptions.html?randVer=' + Math.random().toString(36).slice(2)
				}
			},
			requestDetail: function() {
				return {
					restrict: 'E',
					templateUrl: 'request-detail.html?randVer=' + Math.random().toString(36).slice(2)
				}
			}
			,
			fileread: [function () {
			    return {
			        scope: {
			            fileread: "="
			        },
			        link: function (scope, element, attributes) {
			            element.bind("change", function (changeEvent) {
			                scope.$apply(function () {
			                	//Single file
			                    //scope.fileread = changeEvent.target.files[0];
			                    scope.fileread = changeEvent.target.files;
			                });
			            });
			        }
			    }
			}]
	};