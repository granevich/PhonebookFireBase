/**
 * Created by granevich on 17.05.2017.
 */
var app = angular.module('kievkodes',["ngMaterial", "firebase"]);

function KievKodes($scope, $firebaseArray, $rootScope) {
    $scope.showred = 'Редагувати';
    $scope.reditem = function () {
        $scope.showreditem = !$scope.showreditem;
    };

    // $scope.red = $scope.reditem===true ? 'Редагувати':'Зберегти';
    var ref = firebase.database().ref().child("KievKodes");
    $scope.messages = $firebaseArray(ref);

        $scope.messages.$loaded(
            function(x) {
                if(x ===  $scope.messages){
                    $rootScope.closeloader = true
                }
            },
            function(error) {
                console.error("Error:", error);
            }
        );
    $scope.addMessage = function() {
        $scope.messages.$add({
            name: $scope.AddName,
            tel: $scope.AddNumber,
            type: $scope.type
        });
        $scope.AddName = '';
        $scope.AddNumber='';

    };

    $scope.raisedadd = function (event) {
        if( event.target.innerText === 'ДОДАТИ' && $scope.showAdd===true){
            angular.element(event.target).addClass('md-raised')
        }
        else if (event.target.innerText === 'ДОДАТИ' && $scope.showAdd===false){
            angular.element(event.target).removeClass('md-raised')
        }
        if( event.target.innerText === 'РЕДАГУВАТИ' && $scope.showRed===true){
            angular.element(event.target).addClass('md-raised')
        }
        else if( event.target.innerText === 'РЕДАГУВАТИ' && $scope.showRed===false) {
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
}

app.component('kievKodes',{
    templateUrl: './kievKodes/kievKodes.html',
    controller:KievKodes,
    bindings:{
        adminpanel:'=',
        q:'='
    }
});