var app = angular.module("rutasControladas", ["ngRoute"]);

app.config(function($routeProvider){
    $routeProvider.when("/", {
        templateUrl: "tareas.html",
        controller: "Tareas"
    });
    $routeProvider.otherwise({ redirectTo: "/" });
});

app.controller("Tareas", function($scope, $http){

    $scope.listadoTareas = [];
    $scope.nuevaTarea = {};

    $scope.agregarNuevaTarea = function(){
        $scope.listadoTareas.push($scope.nuevaTarea);
        $scope.nuevaTarea = {};
    };

    $scope.eliminarTareasFinalizadas = function(){
        _.remove($scope.listadoTareas, function(tarea){
            return tarea.realizada;
        });
    };

    $scope.actualizarListadoDesdeServidor = function(){
        $http.get("datosFalsos.json").then(function(response){
            $scope.listadoTareas = response.data;
        });
    };

    window.Tareas = $scope;

});