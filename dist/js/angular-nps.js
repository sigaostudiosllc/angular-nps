(function() {
    'use strict';

    angular.module('angular-nps', []);        
})();
(function () {
    'use strict';

    angular.module('angular-nps')
        .factory('$npsapi', $NpsApi);

    function $NpsApi($http, $q) {
        var api = {
            saveScore: saveScore,
            test: test,
            apiBase: '/sigaoapi/nps'
        };

        return api;

        function test() {
            return $http.get(api.apiBase)
                .then(function (data) {
                    console.log(data.data);
                    return data.data;
                }, function (error) {

                    return error;
                });
        }

        function saveScore(score) {
            return $http.post(api.apiBase, score)
                .then(function (data) {
                    return data.data;
                }, function (error) {
                    console.log(error.data);
                    return error.data;
                });
        }
    }

})();

(function () {
    angular.module('angular-nps')
        .directive('npsForm', npsDirective)
        .controller('npsController', npsController);

    function npsDirective() {
        return {
            controller: "npsController as vm",
            restrict: 'E',
            templateUrl: 'npsForm.html'
        };
    }

    npsController.$inject = ['$scope', '$element', '$attrs', '$npsapi'];

    function npsController($scope, $element, $attrs, $npsapi) {

        //place data-config="" in the tag to pass data into this controller
        //use $attrs.config to use passed attributes

        var vm = {
            showRating: true,
            showComments: false,
            showTest: false,
            submit: submit,
            npsRating: null
        }

        Activate();

        return vm;

        function Activate() {
            console.log('Activated');
        }

        function submit() {
            if(npsRating){
                $npsapi.saveScore(vm.npsRating);
            }        
        }
    }



})();
(function(module) {
try {
  module = angular.module('angular-nps');
} catch (e) {
  module = angular.module('angular-nps', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('npsForm.html',
    '<form>\n' +
    '    <ul class="flex-outer">\n' +
    '\n' +
    '        <!--Radio Buttons-->\n' +
    '        <li ng-show="vm.showRating">\n' +
    '            <label for="rating">Rating</label>\n' +
    '            <div name="rating" class="flex-radio">\n' +
    '                <label for="10">10</label>\n' +
    '                <input type="radio" name="rating-selection" value="10" ng-model="vm.npsRating" checked>\n' +
    '\n' +
    '                <label for="9">9</label>\n' +
    '                <input type="radio" name="rating-selection" value="9" ng-model="vm.npsRating">\n' +
    '\n' +
    '                <label for="8">8</label>\n' +
    '                <input type="radio" name="rating-selection" value="8" ng-model="vm.npsRating">\n' +
    '\n' +
    '                <label for="7">7</label>\n' +
    '                <input type="radio" name="rating-selection" value="7" ng-model="vm.npsRating">\n' +
    '\n' +
    '                <label for="6">6</label>\n' +
    '                <input type="radio" name="rating-selection" value="6" ng-model="vm.npsRating">\n' +
    '\n' +
    '                <label for="5">5</label>\n' +
    '                <input type="radio" name="rating-selection" value="5" ng-model="vm.npsRating">\n' +
    '\n' +
    '                <label for="4">4</label>\n' +
    '                <input type="radio" name="rating-selection" value="4" ng-model="vm.npsRating">\n' +
    '\n' +
    '                <label for="3">3</label>\n' +
    '                <input type="radio" name="rating-selection" value="3" ng-model="vm.npsRating">\n' +
    '\n' +
    '                <label for="3">2</label>\n' +
    '                <input type="radio" name="rating-selection" value="2" ng-model="vm.npsRating">\n' +
    '\n' +
    '                <label for="1">1</label>\n' +
    '                <input type="radio" name="rating-selection" value="1" ng-model="vm.npsRating">\n' +
    '            </div>\n' +
    '\n' +
    '        </li>\n' +
    '\n' +
    '        <!--Regular input-->\n' +
    '        <li ng-show="vm.showTest">\n' +
    '            <label for="first-name">First Name</label>\n' +
    '            <input type="text" id="first-name" placeholder="Enter your first name here">\n' +
    '        </li>\n' +
    '\n' +
    '        <!--Text area-->\n' +
    '        <li ng-show="vm.showComment">\n' +
    '            <label for="message">Comments</label>\n' +
    '            <textarea rows="6" id="message" placeholder="Enter your comments here"></textarea>\n' +
    '        </li>\n' +
    '\n' +
    '        <li>\n' +
    '            <button type="submit" ng-click="vm.submit()">Submit</button>\n' +
    '        </li>\n' +
    '    </ul>\n' +
    '</form>');
}]);
})();
