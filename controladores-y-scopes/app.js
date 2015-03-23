var app = angular.module("comportamientoDinamico", []);
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