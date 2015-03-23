var app = angular.module("comportamientoDinamico", []);
app.controller("Tareas", function($scope, $http){

    $scope.nuevaTarea = "Contenido por defecto";

    $scope.listadoTareas = [{
        descripcion: "trabajar",
        realizada: true
    },{
        descripcion: "vivir",
        realizada: false
    }];

    $scope.actualizarListadoDesdeServidor = function(){
        $http.get("datosFalsos.json").then(function(response){
            $scope.listadoTareas = response.data;
        });
    };

    $scope.agregarNuevaTarea = function(){
        $scope.listadoTareas.push({ realizada: false, descripcion: $scope.nuevaTarea });
        $scope.nuevaTarea = "";
    };

    window.Tareas = $scope;

});