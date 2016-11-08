
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
            style: {
                background: $attrs.backgroundcolor,
                buttonColor: $attrs.buttoncolor,              
            },
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

            if(vm.npsRating){
                $npsapi.saveScore(vm.npsRating);
                $npsapi.saveScoreToGA(vm.npsRating);
            }        
        }
    }



})();