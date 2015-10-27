(function () {
	var ctrlM = angular.module('aqb.ctrl');

	ctrlM.controller('QueryBuilderCtrl', ['$scope', function($scope){
		var tq = String.fromCharCode(9775)+" - ";
		var data = '{"group": {"operator": "AND","rules": []}}';

        function htmlEntities(str) {
            return String(str).replace(/</g, '&lt;').replace(/>/g, '&gt;');
        }

        // This function would be called, Add Condition, Add Group and remove Group...
        function computed(group) {
            if (!group) return "";
            for (var str = "(", i = 0; i < group.rules.length; i++) {
                i > 0 && (str += " <strong>" + group.operator + "</strong> ");
                str += group.rules[i].group ?
                computed(group.rules[i].group) :
                group.rules[i].field + " " + htmlEntities(group.rules[i].condition) + " " + group.rules[i].data;

                // group.operator is AND or OR.
                // console.log('group.operator -- '+tq, group.operator);
                // group.rules[i].group is a undefined value, don't care...
                // console.log('group.rules[i].group -- '+tq, group.rules[i].group);
                // group.rules[i].field --> first field(input) content... link 'FirstName'.
                // console.log('group.rules[i].field --> '+tq, group.rules[i].field);
                // group.rules[i].condition is =, <>, <, <=, >, >= ...
                // console.log('group.rules[i].condition --> '+tq, group.rules[i].condition);
                // 'group.rules[i].data --> the last field (input). It is one letter one time...
                // console.log('group.rules[i].data --> '+tq, group.rules[i].data);
                // htmlEntities(group.rules[i].condition) only do one thing... if the condition has < or > , 
                // those < or > would be replaced by &lt; &gt; -- then computer could understand.
                // console.log('html htmlEntities -> '+tq+" : ", htmlEntities(group.rules[i].condition));
            }

            return str + ")";
        }

        $scope.json = null;

        // filter is the data, which would be pass in and out from query-builder directive.
        // it has been watched in function below...
        $scope.filter = JSON.parse(data);

        // console.log(tq+"scope fileter is -- ", $scope.filter);

        $scope.$watch('filter', function (newValue) {
            // JSON.stringify(the data you want to stringfy, anything you want to replace, how many space between each elements)
            $scope.json = JSON.stringify(newValue, null, 2);
            $scope.output = computed(newValue.group);
            console.log(tq+" $scope.json ", $scope.json);
            console.log(tq+" $scope.output ", $scope.output);
        }, true);

	}]);

})();