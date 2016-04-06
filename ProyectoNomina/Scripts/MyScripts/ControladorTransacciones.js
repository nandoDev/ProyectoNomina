/// <reference path="../angular.intellisense.js" />

//The Module Declaration
var appTransacciones = angular.module('ngmoduleTransacciones', []);

//Declaring Service
appTransacciones.service('ngservice', function ($http) {
    
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

appTransacciones.factory("OperacionFiltrado", function () {
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

appTransacciones.directive("autocompleto", ["OperacionFiltrado", function (OperacionFiltrado) {
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
                    getUniqueEmpleado();
                    scope.$apply();
                    
                    event.preventDefault();
                }
            });
        }
    };
}]);

appTransacciones.directive('material-select', function () {
    return {
        restrict: 'A',
        link: function (scope, elem) {
            $(elem).material_select();
        }
    };
});


//Declaring the Controller
appTransacciones.controller('ngcontrollerTransacciones', function ($scope, $http, ngservice, OperacionFiltrado) {
    $scope.CargarTiposIngreso = CargarTiposIngreso;
    $scope.CargarTiposIngreso();
    $scope.funcionesConOperacionFiltrado = {
        cargarNrosDocumento: function () {
            var promise = ngservice.getDataAutoComplete();
            promise.then(function (resp) {
                OperacionFiltrado.AsignarNrosDocumentos(resp.data);
            });
        },
    }

    $scope.DatosCrearTransaccion = {
        
        "idEmpleado": "",
        "nombre": "",
        "idTiposIngreso": "",
        "idTiposDeduccion": "",
        "tipoTransaccion": "",
        "fecha": "",
        "periodoNomina": "",
        "monto": "",
        "estado": "",
    }

    function CargarDatosEmpleado() {
        $scope.DatosCrearTransaccion.id = $scope.SelectedIdEmpleado
        $scope.DatosCrearTransaccion.cedulaEmpleado = $scope.SelectedNroDocumento;
        $scope.DatosCrearTransaccion.nombre = $scope.SelectedNombre;
        $scope.DatosCrearTransaccion.salarioMensual = $scope.SelectedSalarioMensual;
        $scope.DatosCrearTransaccion.identificadorNomina = $scope.SelectedIdNomina;
    }


    $scope.funcionesConOperacionFiltrado.cargarNrosDocumento();

    $scope.SelectorsPeriodo = ["012016", "022016", "032016"];
    

    $scope.filtroDocumento = "";
    $scope.SelectedPeriodo = "";
    
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

    $scope.SetDisabledIngresoAndDeduccion = SetDisabledIngresoAndDeduccion;
    $scope.DisabledIngreso = false;
    $scope.DisabledDeduccion = true;

    function SetDisabledIngresoAndDeduccion() {


         $scope.DisabledIngreso = !$scope.DisabledIngreso;
         $scope.DisabledDeduccion = !$scope.DisabledDeduccion;
      }

    $scope.getUniqueEmpleado = getUniqueEmpleado;
    $scope.CrearTransaccion = CrearTransaccion;
    $scope.getTransaccionesEmpleado = getTransaccionesEmpleado;
    

    $scope.TiposIngreso = ""; 
   
    
    //$scope.CargarTiposIngreso();

    //Función para cargar todos los registros de tipos de ingreso
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

    //Función para crear una transacción
    function CrearTransaccion() {
        CargarDatosTransaccion();
        console.log($scope.DatosCrearTransaccion);
        var promise = ngservice.crearEmpleado($scope.DatosCrearEmpleado);




        promise.then(function (resp) {
            alert ("Empleado agregado exitosamente!")
            $scope.Message = "La petición se ha completado satisfactoriamente";
        }, function (err) {
            $scope.Message = "Petición fallida" + err.status;
        });
    };

    

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
        $scope.TransaccionesEmpleado = "";
    };

    function getTransaccionesEmpleado() {
        if ($scope.SelectedNroDocumento == "") {
            alert("Debe seleccionar un empleado en el campo de número de documento");
        }
        else {
            var promise = $http.get("/api/Transacciones/GetTransaccionesEmpleado/" + $scope.SelectedNroDocumento);
            promise.then(function (resp) {
                $scope.TransaccionesEmpleado = resp.data;
                $scope.Message = "La petición se ha completado satisfactoriamente";
            },function(err) {
                $scope.Message = "Petición fallida" + err.status;
            });
        }
    };

    //Function para autocompletar campos de empleado según el número de documento seleccionado
    function getUniqueEmpleado() {
        var promise = $http.get("/api/Empleados/GetEmpleado/" + $scope.SelectedNroDocumento);
        promise.then(function (resp) {
            $scope.Empleado = resp.data;
            console.log($scope.Empleado);
            $scope.ClassActive = "active";
            $scope.SelectedIdDocumento = $scope.Empleado.idEmpleado;
            console.log($scope.SelectedIdDocumento);
            $scope.SelectedNombre = $scope.Empleado.nombre;
            $scope.SelectedSalarioMensual = $scope.Empleado.salarioMensual;
            $scope.SelectedIdNomina = $scope.Empleado.identificadorNomina;
            $scope.Message = "La petición se ha completado satisfactoriamente";
        }, function (err) {
            $scope.Message = "Petición fallida" + err.status;
        });
    };
});

