	var app = angular.module('awtApp', ['ngRoute', 'ngAnimate']);

	app.config(config);
	
	$.each(directives, function(name, func) {
		app.directive(name, func);
	});
	
	$.each(filters, function(name, func) {
		app.filter(name, func);
	});
	$.each(services, function(name, func) {
		app.factory(name, func);
	});
	app.run(run);
	app.controller('MainCtrl', MainCtrl);