var MainCtrl = ['$rootScope', '$scope', 'workflowService', 'fileService',
	function($rootScope, $scope, workflowService, fileService) {
		
	$scope.counts = { current: null, valStatus: null }
	$scope.fileselection = {}
	$scope.query = {
		first: 0,
		max: 150,
		getLast: function() {
			return this.first + this.max;
		}
	};
	
	$scope.nextPage = function() {
		$scope.query.first = $scope.query.getLast();
		$scope.pullData();
	};

	$scope.previousPage = function() {
		$scope.query.first = $scope.query.first - $scope.query.max;
		$scope.pullData();
	};
	
	
	/*TESTING*/	/*OVERLAY and DROPDOWNS INSIDE OVERLAY*/
	
	/*var overlayElement = document.querySelector('.ds-overlay')
	w3ds.overlay(overlayElement)*/
	
	var options = {
			  position: 'left'  
			}
	
	/*DROPDOWN*/
	
	/*var dropdownElement = document.querySelector('.ds-dropdown')
	w3ds.dropdown(dropdownElement)*/
	var dropdownElements = $(".ds-dropdown");
	$.each(dropdownElements, function(idx, obj) { w3ds.dropdown(obj) });
	
	$.each(dropdownElements, function(idx, obj) { console.log(idx, obj) });
	/*DROPDOWN*/
	
	
	/*TESTING END*/
	
	/*FILTERS FUNCTIONALITY TESTING */
	$scope.initViewList = function() {
		if ( localStorage['awt-filters'] ) $rootScope.filters = JSON.parse(localStorage['awt-filters']);
  		if ( localStorage['awt-savedVals'] ) $scope.selections.valStatuses = JSON.parse(localStorage['awt-savedVals']);
		else $scope.resetValStatuses();
  		
  		$scope.lookUpSavedFields();
  		
		$scope.inactiveFilterFlag = eval(localStorage['awt-inactiveFilterFlag']);
		$scope.activeFilterFlag = eval(localStorage['awt-activeFilterFlag']);
		
		$scope.fieldSectionInactive = eval(localStorage['awt-fieldSectionInactive']);
	}
	
	$scope.savedFields = {};
	$scope.savedVals = {};
	$scope.savedViews = {};
	
	$scope.fieldSectionUpdate = function() {
		$scope.fieldSectionInactive = !$scope.fieldSectionInactive;
		$rootScope.saveVariableLocally('fieldSectionInactive', $scope.fieldSectionInactive);
	};
	
	$scope.inactiveFiltersUpdate = function() {
		$scope.inactiveFilterFlag = !$scope.inactiveFilterFlag;
		$rootScope.saveVariableLocally('inactiveFilterFlag', $scope.inactiveFilterFlag);
	};
	
	$scope.activeFiltersUpdate = function() {
		$scope.activeFilterFlag = !$scope.activeFilterFlag;
		$rootScope.saveVariableLocally('activeFilterFlag', $scope.activeFilterFlag);
		console.log("itsworking");
	};

	$scope.saveSelectedFieldsLocally = function(field, value) {
			if(value) $scope.savedFields[field] = value;
			else delete $scope.savedFields[field]
			
			$rootScope.saveVariableLocally('savedFields', JSON.stringify($scope.savedFields));
			
			$scope.assignAndSaveCurrentView("Custom (Saved Locally)", "-1");
		};
		
		$scope.assignSavedFields = function(fieldsVisibility) {
			$.each($scope.fields.map, function(id, field) {
				if(fieldsVisibility[id]) {
					$scope.savedFields[id] = true
					$scope.fields.map[id].visible = true;
				}
				else {
					delete $scope.savedFields[id];
					$scope.fields.map[id].visible = false;
				}
			})
		}
		
		$scope.lookUpSavedFields = function() {
			if ( localStorage['awt-savedFields'] ) {
				var savedFields = JSON.parse(localStorage['awt-savedFields']);
				
	  			$.each($scope.savedFields, function(field, value) {
	  				// Make sure to remove fields that do not exist on the tool anymore
	  				if(!$scope.fields.map[field]) delete $scope.savedFields[field]
	  			})
	  			
	  			$scope.assignSavedFields(savedFields);
	  			
	  			if(localStorage['awt-currentView']) $scope.currentView = JSON.parse(localStorage['awt-currentView']);
	  		} 
			else $scope.currentView = { name: "Default View", idx: "0" };
		};

$scope.showFilterIcon = function() {
		var filterKeyChange = false;
		var filterInputIsActive = false;
		for (var key in $scope.selections.valStatuses) {
			if($scope.selections.valStatuses[key]) {
				filterKeyChange = true; 
				break;
			}
		}
		for (var key in $scope.filters) {
			if($scope.filters[key].length >= 0) filterInputIsActive = true;
			if($scope.filters[key].length > 0) {
				filterKeyChange = true; 
				break;
			}
		}
		$scope.filtersActive = filterKeyChange;
		$scope.filterInputIsActive = filterInputIsActive;
	};
	
	$scope.initExplorePerspectives = function() {
		$scope.initViewList();
		$scope.fetchAndLoad(true);
	}
	
	$scope.init = function() {
		$scope.initialLoad = false;
		if($rootScope.user.accessCount == 0) return;
		
		var queryParams = $location.search();
		$rootScope.overlayClear();
		
		if(!$.isEmptyObject(queryParams) && queryParams['sellerCnum']) {
			loadStatus.loading();
			$scope.claimFullScreen = true
			$scope.fetchRecord(queryParams['sellerCnum'])
		} else {
			$scope.initExplorePerspectives();
		}
	}
	
	// Wait for the page to load all ng-repeats to begin widget initialization
	$scope.$watch('$viewContentLoaded', function() {
        $scope.pullData();
    	console.log("insideinit");
    	$scope.fetchCountList();
	});
	
	//READ ALL DATA 
	$scope.pullData = function() {
		workflowService.fetchAll().then(function(awts) {
			console.log($scope.user.userId);
			$rootScope.awts = awts;
			console.log(awts)
			var arr1=[awts], arr2=[app]; 
			for(request in $rootScope.awts){
				console.log(arr1)
				console.log(arr2)
				if($scope.user.userId == $rootScope.awts[request].submitter_cnum)
					arr1.push($rootScope.awts.app);
				 	arr2.push($rootScope.awts.submitter_cnum);						
				console.log($rootScope.awts[request].apprType)
			}
			
			$rootScope.afterPagination = [];
			if($rootScope.filteredActivities.length == 0){					
				$rootScope.filteredActivities = angular.copy(awts);
			}
			console.log(awts)
			console.log($rootScope.filteredActivities)
			$scope.firstPage();	
			
			// Pagination
			$scope.counts.current = $scope.filteredActivities.length;
			if($scope.filteredActivities.length < $scope.query.max){
				$scope.afterPagination = $scope.filteredActivities;
				console.log($scope.query.max)
			}else{
				$scope.afterPagination = $scope.filteredActivities.slice(0, $scope.query.max);
			}	
				console.log($scope.afterPagination)
		});
	}
	
	
	
	
	$scope.test = function(opt){
//		console.log(opt)
	}
	
	/**
	UPDATES 
		**/
	
	//INSERTS DATA INTO DATABASE
$scope.insertWorkflow = function() {
	if($scope.user){
		$scope.selections.submitterName = $scope.user.name;
		$scope.selections.submitterCnum = $scope.user.userId;
	}

//	console.log($scope.selections)
	$scope.fileselection.files = $scope.selections.files
//	console.log($scope.fileselection)
	delete $scope.selections.files
	console.log($scope.selections.files)
//	console.log($scope.fileselection)
//	$scope.add();
	workflowService.sendWorkflow([$scope.selections]).then(function(awts) { 
		console.log(awts)
//		// call add method
//		$scope.add();
		$rootScope.overlayHide();
	})
	
}
	
//HELP,TIPS,TRICKS OVERLAY......
$scope.refreshLastUpdtShowOvrl = function() {
/*	$scope.fetchLastUpdtTimes();*/
	$rootScope.overlayShow('#overlay-tips-tricks');
		}

$scope.fetchLastUpdtTimes = function() {
		}

//Clears the data in all fields when clicked on 'Cancel'
$scope.clearForm = function(){
	$scope.selections = {};
	$rootScope.overlayHide();
} 

// Used by the recordNavigation page
$scope.fetchCountList = function() {
	console.log("fetchcountlist");
	workflowService.countEe().then(function(count) {
			$scope.counts.current = count;
			console.log(count);
	});
};

//Fetch individual activity's details in an overlay
$scope.fetchRecordOverlay = function(lognbr) {
	$scope.requestDetail = null;

	workflowService.fetchRequestDetail({ 'logNbr':lognbr }).then(function(requestDetail) {
		if(requestDetail) {
			$scope.requestDetail = requestDetail;
			$scope.updateClear();
			
			$rootScope.overlayShow('#request-detail');
			$('.ds-overlay-box').animate({ scrollTop: 0 }, 'fast');
		}
	})
} 

//Make all fields editable in overlay of individual activity
$scope.newUpdate = function(requestDetail) {
	$scope.updatingDetail = true;
	$scope.editedDetail = $.extend(true, {}, requestDetail);
	$scope.editedDetail.targetedByDate = new Date($scope.editedDetail.targetedByDate);type 
//	console.log($scope.editedDetail.targetedByDate);	
} 

//Update all the fields in the database
$scope.updateRecord = function() {
	$scope.savingUpdate = true;
	workflowService.update([$scope.editedDetail]).then(function(requestDetail) {			
		$scope.requestDetailAfterUpdate = requestDetail[0];
		if(!$scope.claimFullScreen) $scope.fetchActivityListAfterUpdate(requestDetail[0]);
		else {
			$scope.savingUpdate = false;
			$scope.updatingDetail = false;
		}
		$('[id^=typeahead-results]').remove();
	})
} 

//Clear the data when single activity overlay is closed
$scope.updateClear = function() {
	$scope.updatingDetail = false;
	$scope.editedDetail = {};
	$scope.selected = {};
	$scope.targetDateFilter = null;
} 

/*
 * Query & Pagination
 */
	
$rootScope.customFilters = null;
$rootScope.filtersActive = false;
$scope.counts = { current: null }
$scope.query = {
	first: 0,
	max: 30,
	getLast: function() {
		return this.first + this.max;
	}
};
	
$scope.nextPage = function() {
		$scope.query.first = $scope.query.getLast();
		$scope.displayActivities($scope.query.first, ($scope.query.first + $scope.query.max), $scope.filteredActivities);
		console.log($scope.filteredActivities);
};

$scope.previousPage = function() {
	$scope.query.first = $scope.query.first - $scope.query.max;
	$scope.displayActivities($scope.query.first, $scope.query.first + $scope.query.max, $scope.filteredActivities);
};

$scope.firstPage = function() {
	$scope.query.first = 0;
	$scope.displayActivities($scope.query.first, $scope.query.first + $scope.query.max, $scope.filteredActivities);
}

// Display Activities on Summary View Page - After Pagination
$scope.displayActivities = function(first, last, array){
	$scope.afterPagination = array.slice(first, last);
	console.log($scope.afterPagination)
}


	$rootScope.loadCalendarView = function(){
			console.log("Calendar View");
			$rootScope.events = [];
	}
	
// Adding A File
	$scope.add = function() {
		console.log($scope.fileselection)
		$.each($scope.fileselection.files, function(field, value) {
			console.log(field)
			console.log(value)
			if(!value.removed) {
				var reader = new FileReader();
				reader.onloadend = function() {
					$scope.toReturn = { name:value.name, data: reader.result };
					$scope.selections.name = value.name;
					$scope.selections.data = reader.result;
					console.log("sending this info");
					delete $scope.selections.files;
					console.log($scope.selections.files); // undefined
					workflowService.sendWorkflow({ name:value.name, data: reader.result }).then(function(awts) { 
						console.log(awts)						
						$rootScope.overlayHide();
					})
					console.log($scope.toReturn);
//					fileService.uploadFile({ name:value.name, data: reader.result }).then(function(response) {
//						if(response) {
//							$scope.fetchFileList();
//						}
//						else return;
//					})
				}
				reader.readAsDataURL(value);
			}
	  	});
		
		$scope.selections.files = {};
		return $scope.toReturn;
	}
	
	$scope.fetchFileList = function() {
		fileService.fileList().then(function(response) {
			if(!response) return;
			else $scope.fileselection.list = response; //was $scope.files.list===changed to $scope.fileselection.list 
		})
	}
	
//TESTING END	
	
}];