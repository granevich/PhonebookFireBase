/**
 * Created by granevich on 23.05.2017.
 */
/**
 * Created by granevich on 18.05.2017.
 */
var app = angular.module('nrcu',["ngMaterial", "firebase",'ngMessages', 'angular-toArrayFilter']);

function nrcu($scope,$mdDialog, $firebaseArray, $rootScope,  $location,  $anchorScroll ) {
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
            templateUrl: './nrcu/dialog.html',
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
    var ref = firebase.database().ref().child("Departments");
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
    $scope.removeHead = function (depart, ide) {
        var delref = firebase.database().ref().child("Departments").child(depart.$id).child('head').child('stuff');
        $scope.mes = $firebaseArray(delref);

        $scope.mes.$loaded().then(function (x) {
            x.$remove(ide);
        });
    };
    $scope.removeBranchHead = function ( branch, ide, depart) {
        var delref = firebase.database().ref().child("Departments").child(depart.$id).child('branches').child(branch.id).child('head').child('stuff');
        $scope.mesbranchHead = $firebaseArray(delref);

        $scope.mesbranchHead.$loaded().then(function (x) {
            x.$remove(ide);
        });

    };
    $scope.removeUser = function ( branch, ide, depart) {
        var delref = firebase.database().ref().child("Departments").child(depart.$id).child('branches').child(branch.id).child('stuff');
        $scope.mesUser= $firebaseArray(delref);
        $scope.mesUser.$loaded().then(function (x) {
            x.$remove(ide);
        });

    };
    $scope.removeSubUser = function ( branch, ide, depart, subbranch) {
        var delref = firebase.database().ref().child("Departments").child(depart.$id).child('branches').child(branch.id).child('subbranches').child(subbranch.id).child('stuff');
        $scope.mesUser= $firebaseArray(delref);
        $scope.mesUser.$loaded().then(function (x) {
            x.$remove(ide);
        });

    };






    function DialogController($scope, $mdDialog, $firebaseArray) {
        var ref = firebase.database().ref().child("Departments");
        $scope.messages = $firebaseArray(ref);
        $scope.ifhassubbranches = true;
        $scope.takeval = function () {
            $scope.$watch('selectedbranch', function (val) {
                val.subbranches ? $scope.ifhassubbranches = false: $scope.ifhassubbranches = true;
                if(val.subbranches){
                    $scope.addMessage = function() {
                        var ref = firebase.database().ref().child("Departments").child($scope.selecteddep.$id).child('branches').child($scope.selectedbranch.id).child('subbranches').child($scope.selectedsubbranch.id).child('stuff');
                        $scope.messages = $firebaseArray(ref);
                        $scope.messages.$add({
                            name:optional($scope.name),
                            position:optional($scope.position),
                            inttel:optional($scope.inttel),
                            outtel:optional($scope.outtel),
                            fax:optional($scope.fax),
                            email:optional($scope.email)

                        });
                        // $mdDialog.hide();
                    };
                }
            });
        };

        $scope.$watch('ifhead', function (newVal) {
            if(newVal===true){
                $scope.addMessage = function() {
                    var ref = firebase.database().ref().child("Departments").child($scope.selecteddep.$id).child('head').child('stuff');
                    $scope.messages = $firebaseArray(ref);
                    $scope.messages.$add({
                        name:optional($scope.name),
                        position:optional($scope.position),
                        inttel:optional($scope.inttel),
                        outtel:optional($scope.outtel),
                        fax:optional($scope.fax),
                        email:optional($scope.email)

                    });
                    // $mdDialog.hide();
                };
            }
            else{
                $scope.addMessage = function() {
                    var ref = firebase.database().ref().child("Departments").child($scope.selecteddep.$id).child('branches').child($scope.selectedbranch.id).child('stuff');
                    $scope.messages = $firebaseArray(ref);
                    $scope.messages.$add({
                        name:optional($scope.name),
                        position:optional($scope.position),
                        inttel:optional($scope.inttel),
                        outtel:optional($scope.outtel),
                        fax:optional($scope.fax),
                        email:optional($scope.email)

                    });
                    // $mdDialog.hide();
                };

                $scope.close = function() {
                    $mdDialog.hide();
                };
            }
        });

        $scope.$watch ('ifsubbranch', function (newal) {
            if(newal===true){
                $scope.addMessage = function() {
                    var ref = firebase.database().ref().child("Departments").child($scope.selecteddep.$id).child('branches').child($scope.selectedbranch.id).child('head').child('stuff');
                    $scope.messages = $firebaseArray(ref);
                    $scope.messages.$add({
                        name:optional($scope.name),
                        position:optional($scope.position),
                        inttel:optional($scope.inttel),
                        outtel:optional($scope.outtel),
                        fax:optional($scope.fax),
                        email:optional($scope.email)

                    });
                    // $mdDialog.hide();
                };

            }
        })





             }




}

app.component('nrcu',{
    templateUrl: './nrcu/nrcu.html',
    controller: nrcu,
    bindings:{
        adminpanel:'=',
        q:'='
    }
});
