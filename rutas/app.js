var app = angular.module("manejoDeRutas", ["ngRoute"]);
app.config(function($routeProvider){
    $routeProvider.when("/", {
        template: '<h1>Página principal</h1>' +
        '<br><a ng-href="#/vista2">Ir a página secundaria</a>'
    });
    $routeProvider.when("/vista2", {
        templateUrl: 'vista2.html'
//vista2.html tiene '<h1>Página secundaria</h1><br><a ng-href="#/">Ir a página principal</a>'
    });
    $routeProvider.otherwise({ redirectTo: "/" });
});