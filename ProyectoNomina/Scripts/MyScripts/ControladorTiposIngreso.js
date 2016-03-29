/// <reference path="../angular.intellisense.js" />

//The Module Declaration
var appI = angular.module('ngmoduleTiposIngreso', []);

//Declaring Service
appI.service('ngservice', function ($http) {
    //The function to read all employers

    this.getTiposIngreso = function () {
        var res = $http.get("/api/TiposIngreso/GetTiposIngreso");
        return res;
    };



    this.getDataAutoComplete = function () {
        var res;
        res = $http.get("/api/Empleados/GetDataAutoComplete/");
        return res;
    };
});


appI.factory("OperacionFiltrado", function () {
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

appI.directive("autocompleto", ["OperacionFiltrado", function (OperacionFiltrado) {
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
appI.controller('ngcontrollerTiposIngreso', function ($scope, ngservice, OperacionFiltrado) {

    $scope.funcionesConOperacionFiltrado = {
        cargarNrosDocumento: function () {
            var promise = ngservice.getDataAutoComplete();
            promise.then(function (resp) {
                OperacionFiltrado.AsignarNrosDocumentos(resp.data);
            });
        },
    }

    $scope.DatosCrearTiposIngreso = {
        "nombre": "",
        "dependeDeSalario": "",
        "estado": "",
        "porcentaje": ""
    }

    function CargarDatosTiposIngreso() {

        $scope.DatosCrearTiposIngreso.nombre = $scope.SelectedNombre;
        $scope.DatosCrearTiposIngreso.dependeDeSalario = $scope.SelectedDependeDeSalario;
        $scope.DatosCrearTiposIngreso.estado = $scope.SelectedEstado;
        
    }


    //$scope.funcionesConOperacionFiltrado.cargarNrosDocumento();

    $scope.TipoIngreso = "";
    $scope.TiposIngreso = "";
    $scope.ClassActive = "";

    $scope.SelectedNombre = "";
    $scope.SelectedDependeDeSalario = "";
    $scope.SelectedEstado = "";
    

    $scope.CleanFields = CleanFields;
    $scope.CargarTiposIngreso = CargarTiposIngreso;
    $scope.getUniqueTiposIngreso = getUniqueTiposIngreso;
    $scope.CrearTiposIngreso = CrearTiposIngreso;
    $scope.EditarTiposIngreso = EditarTiposIngreso;
    $scope.CargarDatosTiposIngreso = CargarDatosTiposIngreso;

    //Función para cargar todos los registros de tipos de deducción
    function CargarTiposIngreso() {
        var promise = ngservice.getTiposIngreso();
        promise.then(function (resp) {
            $scope.TiposIngreso = resp.data;
            console.log($scope.TiposIngreso);
            $scope.Message = "La petición se ha completado satisfactoriamente";
        }, function (err) {
            $scope.Message = "Petición fallida" + err.status;
        });
    };

    //Función para crear un tipo de deducción
    function CrearTiposIngreso() {
        CargarDatosTiposIngreso();
        console.log($scope.DatosTiposIngreso);
        var promise = ngservice.crearTiposIngreso($scope.DatosCrearTiposIngreso);
        promise.then(function (resp) {
            alert("Empleado agregado exitosamente!")
            $scope.Message = "La petición se ha completado satisfactoriamente";
        }, function (err) {
            $scope.Message = "Petición fallida" + err.status;
        });
    };

    //Función para editar un tipo de deducción
    function EditarTiposIngreso() {
        CargarDatosTiposIngreso();
        console.log($scope.DatosCrearTiposIngreso);

        var promise = ngservice.editarTiposIngreso($scope.DatosTiposIngreso);
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
        $scope.TipoIngreso = "";
        $scope.TiposIngreso = "";
        $scope.ClassActive = "";
        $scope.SelectedNombre = "";
        $scope.SelectedDependeDeSalario = "";
        $scope.SelectedEstado = "";
        
    };

    //Function para cargar registros de nómina según número de documento
    function getUniqueTiposIngreso() {
        var promise = ngservice.getUniqueTiposIngreso($scope.SelectedNombre);
        promise.then(function (resp) {
            $scope.TipoIngreso = resp.data;
            console.log($scope.TipoIngreso);
            $scope.ClassActive = "active";

            $scope.SelectedNombre = $scope.TipoIngreso.nombre;
            $scope.SelectedDependeDeSalario = $scope.TipoIngreso.dependeDeSalario;
            $scope.SelectedEstado = $scope.TipoIngreso.estado;
            $scope.SelectedPorcentaje = $scope.TipoDeduccion.porcentaje;
           
        }, function (err) {
            $scope.Message = "Petición fallida" + err.status;
        });
    };
});
