var run = ['$rootScope', '$location', '$window',
	           function($rootScope, $location, $window) {

		$rootScope.fields = {
				list: [
				       {value: 'log_unique_id', name: 'Log Number', length: 16, visible: true, filterIgnore: true, description: 'Exception Log Number'},
				       {value: 'submitter_name', name: 'Submitter', length: 15, visible: true, description: 'Submitter of Exception'},
				       {value: 'submitter_cnum', name: 'Submitter CNUM', length: 15, visible: true, description: 'Serial Number of Submitter'},
/*				       {value: 'request_detail', name: 'Request Detail', length: 80, visible: true, description: 'Brief Description of Exception Type'},*/
				       {value: 'approval_type', name: 'Approval Type', length: 80, visible: true, description: 'Brief Description of Exception Type'},
				       {value: 'plan_year', name: 'Plan Year', length: 32, visible: true, description: 'Submittion Year of Exception'},
				       {value: 'duration_affected', name: 'Duration', length: 32, visible: true, description: 'Fiscal Year or Half Exception Was Submitted'},
					   {value: 'description', name: 'Description', length: 32, visible: true, description: 'Brief Description Recounting Events of Exception '},
				       {value: 'geo', name: 'Geography', length: 32, visible: true, description: 'Geography'},
				       {value: 'market', name: 'Market', length: 3, visible: true, description: 'Market'},
				       {value: 'busn_unit', name: 'Business Unit', length: 15, visible: true, description: 'Business Unit(s)'},
/*				       {value: 'exception_cate', name: 'Exception Category', length: 15, visible: false, description: 'Exception Category'},*/
				       {value: 'approver1', name: '1st Level Approver', length: 15, visible: true, description: '1st Level Approver'},
				       {value: 'approver2', name: '2nd Level Approver', length: 15, visible: true, description: '2nd Level Approver'},
				       
				],
	  			init: function() {
	  				this.map = {};
	  				var map = this.map;
	  				var list = this.list;
	  				$.each(list, function(i, field) {
	  					map[field.value] = field;
	  				})
	  				
	  				var list = [];
	  				$.each(this.list, function(i, field) {
	  					if(!field.ignore) list.push(field);
	  				})
	  				
	  				this.fieldList = [] 
	  				var cols = 1;
	  				for (var i = 0; i < list.length; i += cols) {
	  					this.fieldList.push(list.slice(i, i + cols));
	  				}
	  				
	  				var list = [];
	  				$.each(this.list, function(i, field) {
	  					if(!field.ignore && !field.filterIgnore) list.push(field);
	  				})
	  				
	  				this.filterList = [] 
	  				var cols = 1;
	  				for (var i = 0; i < list.length; i += cols) {
	  					this.filterList.push(list.slice(i, i + cols));
	  				}
	  				
	  				return this;
	  			}
		}.init();
		
		// Set initial loading
		$rootScope.initialLoad = true;
		
		// Fields visible be default, for clearing the user changes
		$rootScope.defaultVisibleFields = {"spApprStatus":true,"dplmtStatus":true,"orgName":true,
											"geo":true,"sellerCnum":true,"lastUpdtName":true,
											"lastUpdtTime":true,"sellerName":true,"leverageDesc":true};
	  		
		// Function to highlight the Name of the current page on the Header
		$rootScope.viewPath = function() {
  			return $location.path();
  		};
	 		
  		$rootScope.filters = {}
  		$rootScope.filteredActivities = [];
  		
  		$rootScope.saveVariableLocally = function(variable, value) {
  			
  			//TODO(IMAGAL): Remove debug logs
  			console.log("Filter saved:")
  			console.log(variable + " " + value)
  			
  			localStorage['awt-' + variable] = value;
  		};
  		
  		/*
  		 * Header functions to help directive
  		 */
  		
  		// Functions used to implement frozen header at the top of the page when scrolling down
  		$rootScope.fixedFreezeEls = {};
  		$rootScope.fixedFrozenEls = {};
  		$rootScope.fixedHeader = false;
  		$rootScope.posFrozenEls = function() {
  			$.each($rootScope.fixedFreezeEls, function(key, el) {
  				$($rootScope.fixedFrozenEls[key]).width($(el).width());
  			});
  		};
  		
  		
  		/*
  		 * BluePage Methods
  		 */
  		
  		$rootScope.createBluePagesLink = function(uid, photo) {
  			if(!uid) uid = '000000000'
  			
			var link = 'http://w3.ibm.com/newbp/profile.html?uid=';
			if(photo) link = 'http://images.tap.ibm.com:10002/image/';
			
			return link + uid;
		};
		
		
  		/*
  		 * Overlay Controls / Overlay Directive Helpers
  		 * Necessary to use Overlays consistently 
  		 */
  		
  		// Array of all open overlay IDs
  		$rootScope.openOverlays = [];
  		
  		// To open overlays and correctly handles the background page
  		$rootScope.overlayShow = function(id) {
  			id = $(id);
  			console.log(id);
  			var list = $rootScope.openOverlays;
  			console.log(list);
  			if(list.length == 0) $('#gsi-html').addClass('gsi-no-scroll');
  			if(list.indexOf(id) < 0) {
  				list.push(id);
  				id.addClass('ds-open');
  			} 
  		}
  		
  		// To close overlays on the correct order they were open; Close the topmost overlay first
  		$rootScope.overlayHide = function() {
  			var list = $rootScope.openOverlays;
  			var id = list.pop();
  			
  			id.removeClass('ds-open').trigger('overlayHide');
  			if(list.length == 0) $('#gsi-html').removeClass('gsi-no-scroll');
  		}
  		
  		// To close all of the overlays and clear the overlay array
  		$rootScope.overlayClear = function() {
  			if($rootScope.openOverlays.length > 0) {
  	  			$rootScope.openOverlays = [];
  	  			$('#gsi-html').removeClass('gsi-no-scroll');
  			}
  		}
  		
  		/*JAVA OBJECTS- WHERE INFO IS HELD IN DROPDOWNS*/
  		$rootScope.selections = {};
  		$rootScope.fileselection = {};
  		
  		$rootScope.options = { 
  		 apprType: [{txt: '01 Eligibility' },
  		        {txt: '02 SCR/SLRs on > $10M Deals' },
  		        {txt: '03 Territory/Quota Changes' },
  		        {txt: '04 Payment Deviation' },
  		        {txt: '05 Measurement Deviation' }],
  		        
/*	      approvalType: [{txt: '01 Deviation From WW Design and WW Eligibility Guidelines', description: 'Used to request approval for a deviation from the WW Design and WW Eligibility Guidelines' },
	        	{txt: '02 SCR/SLRs on > $10M Deals (1H Only)', description: '' },
	            {txt: '03 Territory/Quota Changes', description: '' },
	            {txt: '37 TAAP Payments and Adjustments Outside the TAAP Tool for Eligible EEs', description:'' }],*/
  		            
          managerEndorsement: [{txt: 'YES' },
  		        {txt: 'NO' }],
  		        
  		  planYearAffected: [{txt: '2018' },
  		        {txt: '2019' },
  		        {txt: '2020' },
  		        {txt: '2021' }],
  	  		        
  		  durationAffected: [{txt: '1H' },
  		        {txt: '2H' },
  		        {txt: 'FY' }],
  	  		        
  		  geo: [{txt: 'NA' },
		        {txt: 'MEA' },
		        {txt: 'EU' },
		        {txt: 'LA' },
		        {txt: 'AP' },
		        {txt: 'GCG' },
		        {txt: 'Japan' }],
  	  		        
	      market: [{txt: 'Asean' },
		        {txt: 'Australia/New Zealand' },
		        {txt: 'India/South Asia' },
		        {txt: 'Total Korea GMT' },
		        {txt: 'BeNeLux' },
		        {txt: 'Central/Eastern Europe' },
		        {txt: 'DACH' },
		        {txt: 'France' },
		        {txt: 'Italy' },
		        {txt: 'NORDIC' },
		        {txt: 'SPGI' },
		        {txt: 'UKI' },
		        {txt: 'China' },
		        {txt: 'Hong Kong' },
		        {txt: 'Taiwan' },
		        {txt: 'Japan Region' },
		        {txt: 'Brazil' },
		        {txt: 'Latin America TOP' },
		        {txt: 'Mexico' },
		        {txt: 'Spanish South America' },
		        {txt: 'East Africa TOTAL' },
		        {txt: 'Egypt' },
		        {txt: 'Middle East Africa' },
		        {txt: 'North West Africa' },
		        {txt: 'South Africa' },
		        {txt: 'Southern Africa' },
		        {txt: 'Turkey' },
		        {txt: 'Canada' },
		        {txt: 'Canadian Region' },
		        {txt: 'US Above Market' },
		        {txt: 'US Communications/CSI Market' },
		        {txt: 'US Distribution Market' },
		        {txt: 'US Federal Market' },
		        {txt: 'US Financial Services Market' },
		        {txt: 'US HQ' },
		        {txt: 'US Industrial Market' },
		        {txt: 'US Public Market' }],
  	  		        
  	  	  country:  [{txt: 'Algeria' },
  	  		        {txt: 'Angola' },
  	  		        {txt: 'Argentina' },
  	  		        {txt: 'Australia' },
  	  		        {txt: 'Austria' },
  	  		        {txt: 'Azerbaijan' },
  	  		        {txt: 'Bahamas' },
  	  		        {txt: 'Barbados' },
  	  		        {txt: 'Belgium' },
  	  		        {txt: 'Brazil' },
  	  		        {txt: 'Bulgaria' },
  	  		        {txt: 'Canada' },
  	  		        {txt: 'Chile' },
  	  		        {txt: 'China' },
  	  		        {txt: 'Colombia' },
  	  		        {txt: 'Costa Rica Services' },
  	  		        {txt: 'Croatia' },
  	  		        {txt: 'Curacao' },
  	  		        {txt: 'Cyprus' },
  	  		        {txt: 'Czech Republic' },
  	  		        {txt: 'Denmark' },
  	  		        {txt: 'Ecuador' },
  	  		        {txt: 'Egypt' },
  	  		        {txt: 'Estonia' },
  	  		        {txt: 'Finland' },
  	  		        {txt: 'France' },
  	  		        {txt: 'Germany' },
  	  		        {txt: 'Greece' },
  	  		        {txt: 'Hong Kong' },
  	  		        {txt: 'Hungary' },
  	  		        {txt: 'India' },
  	  		        {txt: 'Indonesia' },
  	  		        {txt: 'Ireland' },
  	  		        {txt: 'Israel' },
  	  		        {txt: 'Italy' },
  	  		        {txt: 'Jamaica' },
  	  		        {txt: 'Japan' },
  	  		        {txt: 'Japan Trek' },
  	  		        {txt: 'Kenya' },
  	  		        {txt: 'Korea' },
  	  		        {txt: 'Kuwait' },
  	  		        {txt: 'Latvia' },
  	  		        {txt: 'Lithuania' },
  	  		        {txt: 'Malaysia' },
  	  		        {txt: 'Mauritius' },
  	  		        {txt: 'Mexico' },
  	  		        {txt: 'Morocco' },
  	  		        {txt: 'Netherlands' },
  	  		        {txt: 'New Zealand' },
  	  		        {txt: 'Nigeria' },
  	  		        {txt: 'Norway' },
  	  		        {txt: 'Pakistan' },
  	  		        {txt: 'Peru'},
  	  		        {txt: 'Philippines' },
  	  		        {txt: 'Poland' },
  	  		        {txt: 'Portugal' },
  	  		        {txt: 'Qatar' },
  	  		        {txt: 'Romania' },
  	  		        {txt: 'Russia' },
  	  		        {txt: 'Saudi Arabia' },
  	  		        {txt: 'Senegal' },
  	  		        {txt: 'Serbia' },
  	  		        {txt: 'Singapore' },
  	  		        {txt: 'Slovakia' },
  	  		        {txt: 'Slovenia' },
  	  		        {txt: 'South Africa' },
  	  		        {txt: 'Spain' },
  	  		        {txt: 'Sri Lanka' },
  	  		        {txt: 'Sweden' },
  	  		        {txt: 'Switzerland' },
  	  		        {txt: 'Taiwan' },
  	  		        {txt: 'Tanzania' },
  	  		        {txt: 'Thailand' },
  	  		        {txt: 'Trinidad' },
  	  		        {txt: 'Tunisia' },
  	  		        {txt: 'Turkey' },
  	  		        {txt: 'Ukraine' },
  	  		        {txt: 'United Arab Emirates' },
  	  		        {txt: 'United Kingdom' },
  	  		        {txt: 'United States' },
  	  		        {txt: 'Uruguay' },
  	  		        {txt: 'Venezuela' },
  	  		        {txt: 'Vietnam' }],
  	  		        
		        busUnit:  [{txt: 'BAL- Hybrid Cloud Analytics' },
  	  		       {txt: 'BCT- Collaboration & Talent Solutions' },
  	  		        {txt: 'BHC- Watson Health' },
  	  		        {txt: 'BSV- Security Services' },
  	  		        {txt: 'BSW- Security Software & Services' },
  	  		        {txt: 'BSY- Security Software' },
  	  		        {txt: 'CCW- Hybrid Cloud Integration' },
  	  		        {txt: 'CHY- Hybrid Cloud' },
  	  		        {txt: 'CMS- IBM Services for Managed Applications' },
  	  		        {txt: 'CSP- Commercial Segment CSP' },
  	  		        {txt: 'CST- Cognitive Solutions Group' },
  	  		        {txt: 'DDC- Digital Sales Cloud' },
  	  		        {txt: 'DDS- Digital Cognitive Solutions Units' },
  	  		        {txt: 'DDV- Digital Sales Services' },
  	  		        {txt: 'ECB- SW Crossbrand (non z)' },
  	  		        {txt: 'EDG- Digital Sales SW Renewals' },
  	  		        {txt: 'FGF- IBM Global Financing' },
  	  		        {txt: 'GGB- GBS Global Business Services' },
  	  		        {txt: 'GGS- GTS Global Technology Services' },
  	  		        {txt: 'GIS- GTS GTS Infrastructure Services' },
  	  		        {txt: 'GMT- GTS Technical Support Services' },
  	  		        {txt: 'GPE- GTS CPE / DPE' },
  	  		        {txt: 'GPL- Global Industry Platforms' },
  	  		        {txt: 'HCP- Hybird Cloud Platforms' },
  	  		        {txt: 'IOT- Internet of Things' },
  	  		        {txt: 'IST- Global Markets Industry Solutions & Business Development' },
  	  		        {txt: 'OIP- Intellectual Property' },
  	  		        {txt: 'S7D- Systems SW 7DZ' },
  	  		        {txt: 'SBP- GBP Business Partner Organization' },
  	  		        {txt: 'SBV- GBP ISV / ESA' },
  	  		        {txt: 'SCI- CSI / GSI' },
  	  		        {txt: 'SCM- Digital Sales Coverage' },
  	  		        {txt: 'SES- Systems HW Cross Brand' },
  	  		        {txt: 'SGI- Global Markets Solutions Global Industries' },
  	  		        {txt: 'SIA- Global Markets Integrated Accounts' },
  	  		        {txt: 'SMM- Global Markets Commercial' },
  	  		        {txt: 'SOL- Watson FSS Solutions' },
  	  		        {txt: 'SSC- GBP Systems HW Channels' },
  	  		        {txt: 'SSE- Global Markets Industry' },
  	  		        {txt: 'SSM- Global Markets Enterprise' },
  	  		        {txt: 'SSS- Systems HW Storage' },
  	  		        {txt: 'SSX- Global Markets Cross Support' },
  	  		        {txt: 'STE- Global Markets Technical Sales' },
  	  		        {txt: 'SWZ- Systems SW Crossbrand z' },
  	  		        {txt: 'SZP- Systems HW Server' },
  	  		        {txt: 'TWC- The Weather Company' },
  	  		        {txt: 'WCE- Watson Customer Engagement' }],
  	  		        
  	  		    salesRoles:  [{txt: 'Absolute Sales Plan Opportunity Based' },
  	  		        {txt: 'Absolute Sales Plan Territory Based' },
  	  		        {txt: 'Early Professional Hire' },
  	  		        {txt: 'ETP' },
  	  		        {txt: 'Individual Quota Plan' },
  	  		        {txt: 'Performance Pool Plan' },
  	  		        {txt: 'Services PE/DPE Quota Plan' },
  	  		        {txt: 'Solutions For Growth Plan' },
  	  		        {txt: 'Target Account Absolute Plan' },
  	  		        {txt: 'Team Quota Plan' },
  	  		        {txt: 'Merger And Acquisitions' }],     
  	  		        
  	  		    noAffectedEmpl:  [{txt: '1-9' },
  	  		        {txt: '10-19' },
  	  		        {txt: '20+' }],
  	  		        
  	  		    incrCate:  [{txt: 'Acquisitions' },
  	  		        {txt: 'Geo GM Revenue Transaction' },
  	  		        {txt: 'Geo GM Signings' },
  	  		        {txt: 'In-Period Incentives' },
  	  		        {txt: 'Significant Signing' },
  	  		        {txt: 'Other' }],  
  	  		        
  	  		    incrPgr:  [{txt: 'Acquisitions- Bluewolf Incremental Incentive' },
  	  		        {txt: 'Acquisitions- Merge/Watson Health Imaging Incremental Incentive' },
  	  		        {txt: 'Acquisitions- Sanovi Incremental Incentive' },
  	  		        {txt: 'Acqusitions- Truven/Simpler Incremental Incentive' },
  	  		        {txt: 'Acqusitions- Agile 3/DRM Incremental Incentive' },
  	  		        {txt: 'Acqusitions- GTS Cloud Expansion Offering Incremental Incentive' },
  	  		        {txt: 'Acqusitions- Promontory Incremental Incentive' },
  	  		        {txt: 'Revenue Transaction- Geo GM Incentives for Key Revenue Transactions (WW)' },
  	  		        {txt: 'Signings- Geo GM Signings Incentives for Global Market Sellers (WW)' },
  	  		        {txt: 'In Period- Marketing Tx 2% Incentive' },
  	  		        {txt: 'In Period- MLC to OTC Conversion Incentive' },
  	  		        {txt: 'In Period- DS8K Box Incentive' },
  	  		        {txt: 'In Period- z Break The Cycle Incentive' },
  	  		        {txt: 'In Period- Blockchain Incremental Incentive' },
  	  		        {txt: 'In Period- 2% for HCL Offerings- IBM AppScan/ Application Security on Cloud New License' },
  	  		        {txt: 'Significant Singing- IGF Significant Signings Incentive- ARS PC/Mobility Commercial Financing' },
  	  		        {txt: 'Significant Signing- IGF Significant Signings Incentive- Multi-Year Services' },
  	  		        {txt: 'Significant Signing- Large GTS I/S and GBS New Outsourcing Signings Program' },
  	  		        {txt: 'Significant Signing- Large TSS-MVS Signings Program' },
  	  		        {txt: 'Significant Signing- Open Infrastructure Offering (OIO) Cross Team Incentive' },
  	  		        {txt: 'Other-Intellectual Property (IP) Total Signings Value Incentive' }],
  	  		        
  	  		    reqMth: [{txt: '1' },
  	  		        {txt: '2' },
  	  		        {txt: '3' },
  	  		        {txt: '4' },
  	  		        {txt: '5' },
  	  		        {txt: '6' },
  	  		        {txt: '7+' }],

  	  		    pmtType:  [{txt: 'Exception Payment' },
		        {txt: 'Hardcopy Check' },
		        {txt: 'Salary Advance (LA only)' },
		        {txt: 'Overpayment' }],
		        
		        pmtReason:  [{txt: 'Accounting/Finance' },
  	  		        {txt: 'CMR/RDC error' },
  	  		        {txt: 'Cty Requires PYA Be Paid Outside of FMS' },
  	  		        {txt: 'Data Provider Error' },
  	  		        {txt: 'Incentive Analyst Error' },
  	  		        {txt: 'New Tool Issue' },
  	  		        {txt: 'No IPL Available To Create Plan Payment Now Or In The Future' },
  	  		        {txt: 'Payroll Calendar Constraint' },
  	  		        {txt: 'Sales Management Error' },
  	  		        {txt: 'Sales Manager Stop Payment Request' },
  	  		        {txt: 'Settlement Or No Future IPL To Be Issued**Use 12S Only' },
  	  		        {txt: 'System Error' },
  	  		        {txt: 'TOP/CCMS Error' }],
  	  		        
  	  		    commnMth:  [{txt: 'January' },
  	  		        {txt: 'February' },
  	  		        {txt: 'March' },
  	  		        {txt: 'April' },
  	  		        {txt: 'May' },
  	  		        {txt: 'June' },
  	  		        {txt: 'July' },
  	  		        {txt: 'August' },
  	  		        {txt: 'September' },
  	  		        {txt: 'October' },
  	  		        {txt: 'November' },
  	  		        {txt: 'December' }],  
  	  		        
  	  		    submitPayroll:  [{txt: 'YES' },
  	  		        {txt: 'NO' }],
  	  		        
  	  		    freqResult:  [{txt: 'Monthly' },
  	  		        {txt: 'Quarterly' },
  	  		        {txt: 'Annually' }],
  	  		        
  	  		    ascaCert:  [{txt: 'YES' },
  	  		        {txt: 'NO' }],
  	  		        
  	  		    furthChecks:  [{txt: 'YES' },
  	  		        {txt: 'NO' }],
  	  		        
  	  		    wkDay:  [{txt: 'WK1' },
  	  		        {txt: 'WK2' },
  	  		        {txt: 'WK3' },
  	  		        {txt: 'WK4' },
  	  		        {txt: 'WK5' },
  	  		        {txt: 'WK6' },
  	  		        {txt: 'WK7' },
  	  		        {txt: 'WK8' },
  	  		        {txt: 'WK9' },
  	  		        {txt: 'WK10' }],
  	  		        
  	  		    resImpl:  [{txt: 'YES' },
  	  		        {txt: 'NO' }], 
  	  		        
  	  		    paymentCycleimpacted:  [{txt: 'YES' },
  	  		        {txt: 'NO' }],
  	  		        
  	  		    provDen:  [{txt: 'YES' },
  	  	  		        {txt: 'NO' }],
  	  	  		        
  	    	    trustSrc:  [{txt: 'YES' },
  	  	  	  		        {txt: 'NO' }],  
  	  	  	  		        
  	  	  	    dataID:  [{txt: 'YES' },
  	  	  	  		        {txt: 'NO' }],	        
  	  		        
  	  		    emplMail:  [{txt: 'YES' },
  	  		        {txt: 'NO' }],  
  	  		        
  	  		    overnightMail:  [{txt: 'YES' },
  	  		        {txt: 'NO' }],    
  	  		        
  	  		    pmtCategory: [{txt: 'Achievement' },
  	  		        {txt: 'Incremental Incentives' },
  	  		        {txt: 'Quota/Rate' },
  	  		        {txt: 'TAAP' },
  	  		        {txt: 'Other' }], 
  	  		        
  	  		    pmtCurr: [{txt: 'Bolivianos' },
  	  		        {txt: 'Colon' },
  	  		        {txt: 'Dollar' },
  	  		        {txt: 'Euro' },
  	  		        {txt: 'Guilder' },
  	  		        {txt: 'Guarani' },
  	  		        {txt: 'New Sol' },
  	  		        {txt: 'New Peso' },
  	  		        {txt: 'Peso' },
  	  		        {txt: 'Real' },
  	  		    	{txt: 'Sovereign Bolivar' },
  	  				{txt: 'Sucre' },
  	  		        {txt: 'Yen' }],
  	  		        
  	  		    fullAssn:  [{txt: 'YES' },
  	  		        {txt: 'NO' }],
  	  		        
  	  		    rootCause: [{txt: 'Ended Plan- Transfer Final Debit to Payroll ' },
  	  		        {txt: 'Other' }],
  		}	
  			
  			
//  			JAVA OBJECTS- WHERE INFO IS HELD IN DROPDOWNS END 
  		
  		
	}];
	


	