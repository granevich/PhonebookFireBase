/**
 * Created by granevich on 22.06.2017.
 */
var app = angular.module('theme', ['ngMaterial'])
    .config(function($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('pink')
            .accentPalette('orange');
    });

app.config(function($mdThemingProvider) {
    // Enable browser color
    $mdThemingProvider.enableBrowserColor({
        theme: 'myTheme', // Default is 'default'
        palette: 'accent', // Default is 'primary', any basic material palette and extended palettes are available
        hue: '200' // Default is '800'
    });
});
app.controller('myCtrl', function($scope, $mdTheming) {
    var removeFunction = $mdTheming.setBrowserColor({
        theme: 'myTheme', // Default is 'default'
        palette: 'accent', // Default is 'primary', any basic material palette and extended palettes are available
        hue: '200' // Default is '800'
    });

    $scope.$on('$destroy', function () {
        removeFunction(); // COMPLETELY removes the browser color
    })
});
// var app=angular.module("theme",["ngMaterial"]).config(function(e){e.theme("default").primaryPalette("pink").accentPalette("orange")});app.config(function(e){e.enableBrowserColor({theme:"myTheme",palette:"accent",hue:"200"})}),app.controller("myCtrl",function(e,t){var a=t.setBrowserColor({theme:"myTheme",palette:"accent",hue:"200"});e.$on("$destroy",function(){a()})});