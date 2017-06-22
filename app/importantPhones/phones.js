/**
 * Created by granevich on 15.05.2017.
 */

var app = angular.module('importantphones',["ngMaterial", "firebase"]);

var config = {
    apiKey: "AIzaSyCr8orlTa4Mem5CAEhLgCWAFjso4HmYX1o",
    authDomain: "phonebook-e2b4d.firebaseapp.com",
    databaseURL: "https://phonebook-e2b4d.firebaseio.com",
    projectId: "phonebook-e2b4d",
    storageBucket: "phonebook-e2b4d.appspot.com",
    messagingSenderId: "555707253731"
};
firebase.initializeApp(config);

function InportPhonesCtrl ($scope, $firebaseArray, $rootScope, $anchorScroll,  $location) {


    $scope.reditem = function () {
        $scope.showreditem = !$scope.showreditem;
    };

    // $scope.red = $scope.reditem===true ? 'Редагувати':'Зберегти';
    var ref = firebase.database().ref().child("importantPhones");
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

    $scope.type = 'ВАЖЛИВІ ТЕЛЕФОННІ НОМЕРИ ПО МІСТУ КИЄВУ';

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


    $scope.addMessage = function() {
        $scope.messages.$add({
            name: $scope.AddName,
            tel: $scope.AddNumber,
            type: $scope.type
        });
        $scope.AddName = '';
        $scope.AddNumber='';
    };


}

app.component('important',{
    templateUrl: './importantPhones/phones.html',
    controller: InportPhonesCtrl,
    bindings:{
       adminpanel:'=',
       q:'='

    }
});