/// <reference path="../angular.intellisense.js" />

//The Module Declaration
var appAsientos = angular.module('ngmoduleAsientos', []);

//Declaring Service
appAsientos.service('ngservice', function ($http) {

    this.getDataAutoComplete = function () {
        var res;
        res = $http.get("/api/Empleados/GetDataAutoComplete/");
        return res;
    };
});

appAsientos.factory("OperacionFiltrado", function () {
    var terminobusqueda = "";
    var NrosDocumentos = "";
    var NrosDocumentosFiltrados = "";

    function filterById(obj) {
        if ('id' in obj && obj.id.startsWith(terminobusqueda)) {
            return true;
        } else {
            return false;
        }
    }
    var interfaz = {
        AsignarNrosDocumentos: function (nrosdocumentos) {
            NrosDocumentos = nrosdocumentos;
        },
        GetNrosDocumentos: function () {
            return NrosDocumentos;
        },

        search: function (term) {
            terminobusqueda = term;
            return new Promise(function (resolve, reject) {
                NrosDocumentosFiltrados = NrosDocumentos.filter(filterById);
                resolve(NrosDocumentosFiltrados);
                console.log(NrosDocumentosFiltrados);
            });
        }
    }
    return interfaz;
});


appAsientos.directive('material-select', function () {
    return {
        restrict: 'A',
        link: function (scope, elem) {
            $(elem).material_select();
        }
    };
});


//Declaring the Controller
appAsientos.controller('ngcontrollerAsientos', function ($scope, $http, ngservice, OperacionFiltrado) {

    
    $scope.SelectorsPeriodo = ["012016", "022016", "032016"];


    $scope.filtroDocumento = "";
    $scope.SelectedPeriodo = $scope.SelectorsPeriodo[0];

    $scope.SelectedNroDocumento = "";
    $scope.ClassActive = "";
    $scope.ClassActiveTiposTransaccion = "active";

    $scope.SelectedNombre = "";
    $scope.SelectedSalarioMensual = "";
    $scope.SelectedIdNomina = "";

    $scope.SelectedIngreso = "";
    $scope.SelectedDeduccion = "";
    $scope.SelectedTipoTransaccion = "I";

    $scope.filterValue = "";
    $scope.CleanFields = CleanFields;

    

    function SetDisabledIngresoAndDeduccion() {
        $scope.DisabledIngreso = !$scope.DisabledIngreso;
        $scope.DisabledDeduccion = !$scope.DisabledDeduccion;
    }

    
    $scope.getAsientosPeriodo = getAsientosPeriodo;
    $scope.TiposIngreso = "";


    //$scope.CargarTiposIngreso();

    //Function que limpia los campos y la tabla
    function CleanFields() {
        $scope.Empleados = null;
        $scope.Message = "";
        $scope.Empleado = "";
        $scope.Empleados = "";
        $scope.ClassActive = "";
        $scope.SelectedNroDocumento = "";
        $scope.SelectedNombre = "";
        $scope.SelectedSalarioMensual = "";
        $scope.AsientosPeriodo = "";
    };

    getAsientosPeriodo();

    function getAsientosPeriodo() {
        if ($scope.SelectedPeriodo == "") {
            alert("Debe seleccionar un periodo");
        }
        else {
            var promise = $http.get("/api/AsientosContables/GetAsientosPeriodo/" + $scope.SelectedPeriodo);
            promise.then(function (resp) {
                $scope.AsientosPeriodo = resp.data;
                console.log($scope.AsientosPeriodo);
                $scope.Message = "La petición se ha completado satisfactoriamente";
            }, function (err) {
                $scope.Message = "Petición fallida" + err.status;
            });
        }
    };

    
});
