

var app = angular.module("sampleApp", ['ngRoute','importantphones', 'kodesandservices','kievkodes','emergencyphones','direction', 'nrcu', "firebase"]);
app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl :'./all/all.html'
        })
        .when("/important", {
            template : '<important ng-hide q="parent.q" adminpanel="parent.adminpanel"></important>'
        })
        .when("/kodes", {
            template :'<kodes-services ng-hide q="parent.q" adminpanel="parent.adminpanel"></kodes-services>'
        })
        .when("/kievkodes", {
            template : '<kiev-kodes ng-hide q="parent.q" adminpanel="parent.adminpanel"></kiev-kodes>'
        })
        .when("/emerg", {
            template : '<emergency-phones ng-hide q="parent.q" adminpanel="parent.adminpanel"></emergency-phones>'
        })
        .when("/direction", {
            template : '<direction ng-hide q="parent.q" adminpanel="parent.adminpanel"></direction>'
        })
        .when("/nrcu", {
            template : '<nrcu ng-hide q="parent.q" adminpanel="parent.adminpanel"></nrcu>'
        })
        .otherwise({
            template : "<h1>Nothing</h1><p>Nothing has been selected</p>"
        });

});
app.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
}]);

app.controller('rootCtrl', function ($scope, $rootScope, $mdSidenav, $firebaseAuth, $timeout) {
    $scope.authObj = $firebaseAuth();

    $scope.signIn = function () {

        $scope.authObj.$signInWithEmailAndPassword($scope.mail, $scope.password).then(function(firebaseUser) {
            console.log("Signed in as:", firebaseUser.uid);

        }).catch(function(error) {
            console.error("Authentication failed:", error);
            $scope.error = true;
            $timeout(function () {
                $scope.error = false;
            }, 2000)
        });
    };
    $scope.authObj.$onAuthStateChanged(function(firebaseUser) {
        if (firebaseUser) {
            console.log("Signed in as:", firebaseUser.uid);
            $scope.adminpanel= true;
            $scope.user = firebaseUser.email;
            $scope.showform = true;
            $scope.showRedButtons = true;
        } else {
            $rootScope.showAdminPanel = false;
            $scope.user = '';
            $scope.showform = false;
            $scope.adminpanel= false;
            $scope.showRedButtons = false;
            console.log("Signed out");
        }
    });




    $scope.closePanel = function () {
        $mdSidenav('left').toggle();
    };
    $scope.openLeftMenu = function() {
        $mdSidenav('left').toggle();
    };
    $rootScope.closeloader= false;


    $scope.showSubButton = function () {

        $scope.activePanel  =  !$scope.activePanel;
            if($scope.activePanel === true){
                    $scope.ButtonsActive  = 'active';
                    $scope.transform_icon='transform_icon_open'
                }
                else if($scope.activePanel === false){

                $scope.ButtonsActive  = 'disable';
                $scope.transform_icon='transform_icon_close'
            }


    };

    $scope.pressEnter = function (event) {
        if (event.which === 13){
          console.log($scope.parent.search);
            $scope.parent.q = $scope.parent.search;
        }

    }

    $scope.watchClear = function () {
        $scope.$broadcast('Clear', {
          Clear: true
        });





    }

});


