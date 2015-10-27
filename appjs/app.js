(function () {
	// var app = 
	// 'queryBuilder'
	var angu = ['ngSanitize'];
	var ctrl = ['aqb.ctrl'];
	var qbjs = ['aqb.querybuilder'];
	var depedencyArr = angu.concat(ctrl, qbjs);

	angular.module('aqb', depedencyArr);
	angular.module('aqb.ctrl', []);
	angular.module('aqb.querybuilder', []);
})();