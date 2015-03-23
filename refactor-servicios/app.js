var app = angular.module('refactorServicios', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'listado-tareas.html',
            controller: 'ListadoTareasController'
        })
        .when('/tarea', {
            templateUrl: 'tarea.html',
            controller: 'NuevaTareaController'
        })
        .when('/tarea/:position', {
            templateUrl: 'tarea.html',
            controller: 'EdicionTareaController'
        })
        .otherwise({ redirectTo: "/" });
});

app.controller("ListadoTareasController", function ($scope, TareasService) {
    $scope.tareas = TareasService.getTareas();
    $scope.eliminarFinalaizadas = function () {
        //lo que quieran hacer relacionado con la vista o con validaciones
        TareasService.eliminarFinalizadas();
    }
});

app.controller("NuevaTareaController", function ($scope, $location, TareasService) {
    $scope.tarea = {};

    $scope.guardarTarea = function () {
        TareasService.nuevaTarea($scope.tarea);
        $location.path('/');
    }
});

app.controller("EdicionTareaController", function ($scope, $routeParams, $location, TareasService) {
    var tareas = TareasService.getTareas();
    $scope.tarea = tareas[$routeParams.position];

    $scope.guardarTarea = function () {
        $location.path('/');
    }
});


app.factory("TareasService", function ($http, $timeout) {

    var tareas = [];

    var TareasService = {};
    TareasService.getTareas = getTareas;
    TareasService.nuevaTarea = nuevaTarea;
    TareasService.eliminarFinalizadas = eliminarFinalizadas;

    initService();

    return TareasService;

    function initService(){
        $http.get("datosFalsos.json").then(function (response) {
            $timeout(function(){
                tareas.splice(0, tareas.length);
                _.each(response.data, function(tarea){
                    tareas.push(tarea)
                });
            }, 0);
        });
    }

    function getTareas() {
        return tareas;
    }

    function nuevaTarea(tarea) {
        tareas.push(tarea);
    }

    function eliminarFinalizadas() {
        _.remove(tareas, function (tarea) {
            return tarea.realizada;
        });
    }

});
