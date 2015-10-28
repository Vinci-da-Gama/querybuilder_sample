(function () {
	var qbM = angular.module('aqb.querybuilder');

	qbM.directive('queryBuilder', ['$compile', function($compile){
		return {
			// terminal: true,
			scope: {
				group: '=',
                firstFields: '=',
                tmplCollection: '='
			}, // {} = isolate, true = child, false/undefined = no change
			/*controller: function($scope, $element, $attrs, $transclude) {
                console.log("The passed in firstField is --> ", $scope.firstField);
            },*/
			// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
			restrict: 'AEC', // E = Element, A = Attribute, C = Class, M = Comment
			// template: '',
			templateUrl: './partials/query-builder.html',
			// replace: true,
			// transclude: true,
			compile: function(tElement, tAttrs) {
                var tq = String.fromCharCode(9775)+" -- ";

                var content, directive;
                content = tElement.contents().remove();
                // This content is every element in query-builder.html, in short, it is the query-builder.html
                // console.log("beginning (content) --> "+tq, content);
                // This tElement is the query builder itself...
                // console.log("beginning (tElement) --> "+tq, tElement);
                // at beginning directive is undefined. this directive is actually current directive (queryBuilder).
                // console.log("beginning (directive) --> "+tq+" this directive is actually current directive (queryBuilder). But it is only triggered when the Add Group btn clikced. thus at the beginning, it is undefined. Result -- ", directive);
                

                // linking
                return function linking(scope, elm, attrs){

                    scope.operators = [
                    { name: 'AND' },
                    { name: 'OR' }];

                    // first field... Actually, the data of it should be received from backend...
                    /*scope.fields = [
                    { name: 'Firstname' },
                    { name: 'Lastname' },
                    { name: 'Birthdate' },
                    { name: 'City' },
                    { name: 'Country' }];*/

                    scope.conditions = [
                    { name: '=' },
                    { name: '<>' },
                    { name: '<' },
                    { name: '<=' },
                    { name: '>' },
                    { name: '>=' }];

                    console.log("¿¿¿¿¿¿¿¿¿", scope.firstFields);

                    var u = scope.tmplCollection;
                    scope.addCondition = function () {
                        // add new condition to rules
                        // the field here will match the content in arr firstFields (Lastname === Lastname),
                        // if the name matched, it would be the first option displayed.
                        // don't konw how. will find out...
                        scope.group.rules.push({
                            condition: '=',
                            field: 'Firstname',
                            data: '',
                            tmpurl: u.url2
                        });
                        // console.log(tq+'the condiiton is :--> ', scope.group.rules);
                        console.log('one example --> '+tq+" -Due to the group has been built, the computed would be executed to form the rules data to group Obj...");
                        console.log('the pass in group is --> ', scope.group);

                        // pickupTemplateForLastField (scope.group.rules[0].field);
                        // pickupTemplateForLastField (scope.group.rules);
                        
                    };

                    // This is for select and change Templates
                    scope.getResponsiveUrl = function (ru) {
                        /*var sgr = scope.group.rules;
                        console.log('The index of current rule --> '+tq, ru);
                        console.log('...........cao...........');
                        var i = sgr.indexOf(ru);
                        console.log(tq+' the index is : '+i);*/
                        console.log('ru.field --> '+ru.field);
                        if (ru.field === 'Firstname') {
                            ru.tmpurl = u.url2;
                            console.log('url2 -- ru.tmpurl --> '+ru.tmpurl);
                        } else{
                            
                            ru.tmpurl = u.url1;
                            console.log('url1 -- ru.tmpurl --> '+ru.tmpurl);
                        };
                    };
                    // This is for select and change Templates

                    scope.removeCondition = function (index) {
                        // remove the pointed rule
                        scope.group.rules.splice(index, 1);
                    };

                    scope.addGroup = function () {
                        // add one more group
                        scope.group.rules.push({
                            group: {
                                operator: 'AND',
                                rules: []
                            }
                        });
                    };

                    scope.removeGroup = function () {
                        // remove current group
                        "group" in scope.$parent && scope.$parent.group.rules.splice(scope.$parent.$index, 1);
                    };

                    directive || (directive = $compile(content));

                    elm.append(directive(scope, function ($compile) {
                        // the directive is about compile new added group into current directive...
                        console.log(tq+" directive is: ", directive);
                        return $compile;
                    }));

				}

                /*var ff = $('#firstField');
                console.log('the first field valuel is --> '+ff.val());
                console.log('the first field text is --> '+ff.text());
                console.log('the first field html is --> '+ff.html());*/

			}
			/*link: function($scope, iElm, iAttrs, ctrl) {
                var ff = iElm.find('#firstField');
                console.log('the first field valuel is --> '+ff.val());
                console.log('the first field text is --> '+ff.text());
                console.log('the first field html is --> '+ff.html());
            }*/
		};
	}]);

})();