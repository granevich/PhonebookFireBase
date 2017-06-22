/**
 * Created by granevich on 18.05.2017.
 */
var app = angular.module('direction',["ngMaterial", "firebase"]);

function emergencyphones($scope,  $mdDialog, $firebaseArray, $rootScope, $location, $anchorScroll) {
    $scope.showred = 'Редагувати';
    $scope.reditem = function () {
        $scope.showreditem = !$scope.showreditem;
    };
    function optional(item) {
        if (item) {
            return item;
        } else {
            return null;
        }
    };
    $scope.showAdvanced = function(ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: './direction/dialog.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true
        })

    };
    $scope.raisedadd = function (event) {
        if( event.target.innerText === 'РЕДАГУВАТИ' && $scope.redbutton===true){
            angular.element(event.target).addClass('md-raised')
        }
        else if( event.target.innerText === 'РЕДАГУВАТИ' && $scope.redbutton===false) {
            angular.element(event.target).removeClass('md-raised')
        }

    };
    $scope.red=false;
    $scope.raisedred = function (event) {
        if( event.target.innerText === 'ЗМІНИТИ' && $scope.red===false){
            $scope.red=true;
            angular.element(event.target).addClass('md-raised active');

        }
        else if( event.target.innerText === 'ЗМІНИТИ' && $scope.red===true) {
            $scope.red=false;
            angular.element(event.target).removeClass('md-raised active')

        }

    };
    $scope.redSave = function () {
        $scope.red=false;
        var b =   document.getElementsByClassName("active");
        angular.element(b).removeClass('active md-raised');

    };




    var ref = firebase.database().ref().child("direction");
    $scope.messages = $firebaseArray(ref);
    $scope.messages.$loaded(
        function(x) {
            if(x ===  $scope.messages){
                $rootScope.closeloader = true;
                $location.hash('up');

                // call $anchorScroll()
                $anchorScroll();
            }
        },
        function(error) {
            console.error("Error:", error);
        }
    );
    function DialogController($scope, $mdDialog,$firebaseArray) {
        var ref = firebase.database().ref().child("direction");
        $scope.messages = $firebaseArray(ref);
        $scope.addMessage = function() {

            $scope.messages.$add({
                name:optional($scope.name),
                position:optional($scope.position),
                intel:optional($scope.intel),
                outtel:optional($scope.outtel),
                fax:optional($scope.fax),
                email:optional($scope.email),
                recetionname:optional($scope.recetionname),
                reseptintel:optional($scope.reseptintel),
                resepouttel:optional($scope.resepouttel),
                receptoutfax:optional($scope.receptoutfax),
                receptoutemail:optional($scope.receptoutemail)
            });
        };
        $scope.close = function() {
            $mdDialog.hide();
        };
    }
}

app.component('direction',{
    templateUrl: './direction/direction.html',
    controller: emergencyphones,
    bindings:{
        adminpanel:'=',
        q:'='
    }
});
