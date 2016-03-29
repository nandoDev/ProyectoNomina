/// <reference path="../angular.intellisense.js" />

//The Module Declaration
var appD = angular.module('ngmoduleTiposDeduccion', []);

//Declaring Service
appD.service('ngservice', function ($http) {
    //The function to read all employers

    this.getTiposDeduccion = function () {
        var res = $http.get("/api/TiposDeduccion/GetTiposDeduccion");
        return res;
    };

    
   
    this.getDataAutoComplete = function () {
        var res;
        res = $http.get("/api/Empleados/GetDataAutoComplete/");
        return res;
    };
});


appD.factory("OperacionFiltrado", function () {
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

appD.directive("autocompleto", ["OperacionFiltrado", function (OperacionFiltrado) {
    return {
        restrict: "A",
        link: function (scope, elem, attr, ctrl) {
            elem.autocomplete({
                source: function (searchTerm, resolve) {
                    OperacionFiltrado.search(searchTerm.term).then(function (autocompleteResults) {
                        resolve($.map(autocompleteResults, function (autocompleteResult) {
                            return {
                                label: autocompleteResult.id,
                                value: autocompleteResult.id
                            }
                        }))
                    });
                },
                minLength: 3,
                select: function (event, selectedItem) {
                    //Do something with the selected item, e.g. 
                    scope.SelectedNroDocumento = selectedItem.item.value;
                    scope.$apply();
                    event.preventDefault();
                }
            });
        }
    };
}]);


//Declaring the Controller
appD.controller('ngcontrollerTiposDeduccion', function ($scope, ngservice, OperacionFiltrado) {

    $scope.funcionesConOperacionFiltrado = {
        cargarNrosDocumento: function () {
            var promise = ngservice.getDataAutoComplete();
            promise.then(function (resp) {
                OperacionFiltrado.AsignarNrosDocumentos(resp.data);
            });
        },
    }

    $scope.DatosCrearTiposDeduccion = {
        "nombre": "",
        "dependeDeSalario": "",
        "estado": "",
        "porcentaje": ""
    }

    function CargarDatosTiposDeduccion() {

        $scope.DatosCrearTiposDeduccion.nombre = $scope.SelectedNombre;
        $scope.DatosCrearTiposDeduccion.dependeDeSalario = $scope.SelectedDependeDeSalario;
        $scope.DatosCrearTiposDeduccion.estado = $scope.SelectedEstado;
        $scope.DatosCrearTiposDeduccion.porcentaje = $scope.SelectedPorcentaje;
    }


    //$scope.funcionesConOperacionFiltrado.cargarNrosDocumento();

    $scope.TipoDeduccion = "";
    $scope.TiposDeduccion = "";
    $scope.ClassActive = "";

    $scope.SelectedNombre = "";
    $scope.SelectedDependeDeSalario = "";
    $scope.SelectedEstado = "";
    $scope.SelectedPorcentaje= "";

    $scope.CleanFields = CleanFields;
    $scope.CargarTiposDeduccion = CargarTiposDeduccion;
    $scope.getUniqueTiposDeduccion = getUniqueTiposDeduccion;
    $scope.CrearTiposDeduccion = CrearTiposDeduccion;
    $scope.EditarTiposDeduccion = EditarTiposDeduccion;
    $scope.CargarDatosTiposDeduccion = CargarDatosTiposDeduccion;

    //Función para cargar todos los registros de tipos de deducción
    function CargarTiposDeduccion() {
        var promise = ngservice.getTiposDeduccion();
        promise.then(function (resp) {
            $scope.TiposDeduccion = resp.data;
            console.log($scope.TiposDeduccion);
            $scope.Message = "La petición se ha completado satisfactoriamente";
        }, function (err) {
            $scope.Message = "Petición fallida" + err.status;
        });
    };

    //Función para crear un tipo de deducción
    function CrearTiposDeduccion() {
        CargarDatosTiposDeduccion();
        console.log($scope.DatosTiposDeduccion);
        var promise = ngservice.crearTiposDeduccion($scope.DatosCrearTiposDeduccion);
        promise.then(function (resp) {
            alert("Empleado agregado exitosamente!")
            $scope.Message = "La petición se ha completado satisfactoriamente";
        }, function (err) {
            $scope.Message = "Petición fallida" + err.status;
        });
    };

    //Función para editar un tipo de deducción
    function EditarTiposDeduccion() {
        CargarDatosTiposDeduccion();
        console.log($scope.DatosCrearTiposDeduccion);

        var promise = ngservice.editarTiposDeduccion($scope.DatosTiposDeduccion);
        promise.then(function (resp) {
            alert("Empleado editado exitosamente!")
            $scope.Message = "La petición se ha completado satisfactoriamente";
        }, function (err) {
            $scope.Message = "Petición fallida" + err.status;
        });
    };

    //Function que limpia los campos y la tabla
    function CleanFields() {
        $scope.Message = "";
        $scope.TipoDeduccion = "";
        $scope.TiposDeduccion = "";
        $scope.ClassActive = "";
        $scope.SelectedNombre = "";
        $scope.SelectedDependeDeSalario = "";
        $scope.SelectedEstado = "";
        $scope.SelectedPorcentaje = "";
    };

    //Function para cargar registros de nómina según número de documento
    function getUniqueTiposDeduccion() {
        var promise = ngservice.getUniqueTiposDeduccion($scope.SelectedNombre);
        promise.then(function (resp) {
            $scope.TipoDeduccion = resp.data;
            console.log($scope.TipoDeduccion);
            $scope.ClassActive = "active";

            $scope.SelectedNombre = $scope.TipoDeduccion.nombre;
            $scope.SelectedDependeDeSalario = $scope.TipoDeduccion.dependeDeSalario;
            $scope.SelectedEstado = $scope.TipoDeduccion.estado;
            $scope.SelectedPorcentaje = $scope.TipoDeduccion.porcentaje;
            $scope.Message = "La petición se ha completado satisfactoriamente";
        }, function (err) {
            $scope.Message = "Petición fallida" + err.status;
        });
    };
});
