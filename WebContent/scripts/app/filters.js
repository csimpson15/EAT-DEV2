	var filters = {
			
			serial: ['$filter', function($filter) {
				return function(input) {
					if(!input) return 
					
					while (input.length < 6) {
						input = '0' + input;
					}
					return input;
				}
			}],
			verifyCountry: ['$filter', function($filter) {
				return function(input) {
					if(!input) return 
					
					if (input == 672) input = 738;
					else if (input == 642) input = 784;
					else if (input == 709) input = 744;
					
					return input;
				}
			}],
			blankAble: ['$filter', function($filter) {
				return function(input) {
					if(input) return input
					return "\xa0";
				}
			}],
			ordinalIndicator: ['$filter', function($filter) {
				return function(input) {
					if(!input) return
					
					var number = parseInt(input, 10)
					if(isNaN(number)) return
					
					if(number < 100) {
						
						var remainder = number % 10;
						
						switch(true) {
						
							case remainder == 1: 
							number = number + 'st';
							break;
						
							case remainder == 2:
							number = number + 'nd';
							break;
							
							case remainder == 3: 
							number = number + 'rd';
							break;
							
							default:
							number = number + 'th';
							break;
						}
					} else {
						number = number + 'th';
					}
					
					return number;
				}
			}],
			showFields: function() {
				return function(fields, text) {
					$.each(fields, function(i, field) {
						field.highlight = false;
						if (text && (field.description.match(new RegExp(text, 'i')) || field.name.match(new RegExp(text, 'i')))) {
							field.highlight = true;
						}
					});
					return fields; 
				}
			}
	
	};
