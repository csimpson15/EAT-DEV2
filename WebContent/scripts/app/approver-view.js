var MainCtrl = ['$rootScope', '$scope', 'workflowService',
	function($rootScope, $scope, workflowService) {
		
	$scope.counts = { current: null, valStatus: null }
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
	
	/*FILTERS FUNCTIONALITY TESTING END */
	
	
/*	
	deliverableService.getDeliverable().then(function(deliverables){
		$scope.deliverables = deliverables;
	});
	
	$scope.submitUsersInfo = function(){
		var user = 
				{
				"userId":$scope.selectedUserId,
				"completionDate":$scope.selectedCompletionDate,
				"projType":$scope.selectedProjType.projType,
				"timeSaved":$scope.selectedTimeSaved.timeSaved,
				"userName":$scope.selectedUserName.userName
				}
		submitUsersInfoService.submitUsersInfo(user);
				}
	*/
	/*$scope.fetchRecord = function(userId){
		$location.path("/user-detail").search({userId: userId})
	};*/
	
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
		});
	}
	
	$scope.test = function(opt){
//		console.log(opt)
	}
	
	//Viewing Certain Dropdowns When Certain Choices Are Selected
/*	if (this.getField("exception category").value == "exception type"){      //replace "dropdown" with the name of the dropfield
		event.target.display = display.visible;
		}
		else{
		event.target.display = display.hidden;
		}*/
	
//	TESTING
	
	/*$scope.inquiryText = $location.search().text;
	console.log($location.search().text);*/


/*countryService.getCountries().then(function(countries) {
	$scope.countries = countries;
});

squadService.getSquads().then(function(squads) {
	$scope.squads = squads;
});*/

/*$scope.submitInquiry = function() {
	var inq = {
			"status":"Open",
			"cty":$scope.selectedCountry.cty,
			"squadId":$scope.selectedSquad.squadId,
			"inquiryActions":
				[{"actionText":$scope.inquiryText,
				"inquiry": inq}]
	};
	
	inquiryService.submitInquiry(inq);*/

/*}

inqMainService.getInqMains().then(function(inqMains) {
	$scope.inqMains = inqMains;
});
*/
/*$scope.fetchRecord = function(logNbr) {
	$location.path('/inq-detail').search({lognbr: logNbr})
};

$scope.logNbr = $location.search().lognbr;
inquiryService.getInquiry($scope.logNbr).then(function(inquiry) {
	$scope.inquiry = inquiry.data;
});*/

/*$scope.showTextArea = function() {
	$scope.textArea = true;
}

$scope.submitComment = function() {
	var cmt = {
			"actionText": $scope.comments,
			"inquiry" : {logNbr: $scope.logNbr}
	};
	inquiryActionService.submitComment(cmt);
	$route.reload();
}*/	

/* 	TESTING END*/ 
	
	/**
	UPDATES 
		**/
	
	//INSERTS DATA INTO DATABASE
$scope.insertWorkflow = function() {
	if($scope.user){
		$scope.selections.submitterName = $scope.user.name;
		$scope.selections.submitterCnum = $scope.user.userId;	
	}

	workflowService.sendWorkflow([$scope.selections]).then(function(awts) {
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
	$scope.editedDetail.targetedByDate = new Date($scope.editedDetail.targetedByDate);
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

}];