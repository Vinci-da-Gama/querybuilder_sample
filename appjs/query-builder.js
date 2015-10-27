(function () {
	var qbM = angular.module('aqb.querybuilder');

	qbM.directive('queryBuilder', ['$compile', function($compile){
		return {
			// terminal: true,
			scope: {
				group: '='
			}, // {} = isolate, true = child, false/undefined = no change
			// controller: function($scope, $element, $attrs, $transclude) {},
			// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
			restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
			// template: '',
			templateUrl: './partials/query-builder.html',
			// replace: true,
			// transclude: true,
			compile: function(tElement, tAttrs) {
                var content, directive;
                content = tElement.contents().remove();
				// linking
				return function (scope, elm, attrs){
					scope.operators = [
                    { name: 'AND' },
                    { name: 'OR' }];

                    scope.fields = [
                    { name: 'Firstname' },
                    { name: 'Lastname' },
                    { name: 'Birthdate' },
                    { name: 'City' },
                    { name: 'Country' }];

                    scope.conditions = [
                    { name: '=' },
                    { name: '<>' },
                    { name: '<' },
                    { name: '<=' },
                    { name: '>' },
                    { name: '>=' }];

                    scope.addCondition = function () {
                        scope.group.rules.push({
                            condition: '=',
                            field: 'Firstname',
                            data: ''
                        });
                    };

                    scope.removeCondition = function (index) {
                        scope.group.rules.splice(index, 1);
                    };

                    scope.addGroup = function () {
                        scope.group.rules.push({
                            group: {
                                operator: 'AND',
                                rules: []
                            }
                        });
                    };

                    scope.removeGroup = function () {
                        "group" in scope.$parent && scope.$parent.group.rules.splice(scope.$parent.$index, 1);
                    };

                    directive || (directive = $compile(content));

                    elm.append(directive(scope, function ($compile) {
                        return $compile;
                    }));

				}
			}
			// link: function($scope, iElm, iAttrs, controller) {}
		};
	}]);

})();