/// <reference path="../angular.intellisense.js" />
 
//The Module Declaration
var app = angular.module('ngmodule', []);
 
//Declaring Service
app.service('ngservice', function ($http) {
    //The function to read all employers

    this.getEmpleados = function () {    
        var res = $http.get("/api/Empleados/GetEmpleados");
        return res;
    };

    this.getUniqueEmpleado = function (filter) {
        var res;
        if (filter.length == 0) {
            return null;
        } else {
            res = $http.get("/api/Empleados/GetEmpleado/" + filter);
            return res;
        }
    };

    this.crearEmpleado = function (datosEmpleado) {
        var res;
        if (datosEmpleado.length == 0) {
            return null;
        } else {
            console.log(JSON.stringify(datosEmpleado));
            res = $http.post("/api/Empleados/CrearEmpleado/", JSON.stringify(datosEmpleado),
            {
                headers: {
                    'Content-Type': ' application / json'
                }
            }
            ).success(function (data) {
            });
            return res;
        }
    };

    this.editarEmpleado = function (datosEmpleado) {
        var res;
        if (datosEmpleado.length == 0) {
            return null;
        } else {
            console.log(JSON.stringify(datosEmpleado));
            res = $http.post("/api/Empleados/EditarEmpleado/", JSON.stringify(datosEmpleado),
            {
                headers: {
                    'Content-Type': 'application / json'
                }
            }
            ).success(function (data) {
            });
            return res;
        }
    };

    
    this.getDataAutoComplete = function () {
        var res;
        res = $http.get("/api/Empleados/GetDataAutoComplete/");
        return res;
    };
});


app.factory("OperacionFiltrado", function () {
    var terminobusqueda="";
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
       AsignarNrosDocumentos : function (nrosdocumentos){
            NrosDocumentos= nrosdocumentos;
        },
        GetNrosDocumentos: function (){
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

app.directive("autocompleto",["OperacionFiltrado", function (OperacionFiltrado) {
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
app.controller('ngcontroller', function ($scope,  ngservice, OperacionFiltrado ) {

    $scope.funcionesConOperacionFiltrado = {
        cargarNrosDocumento: function () {
            var promise = ngservice.getDataAutoComplete();
            promise.then(function (resp) {
                OperacionFiltrado.AsignarNrosDocumentos(resp.data);
            });
        },
    }

    $scope.DatosCrearEmpleado = {
        "cedula":"",
        "nombre": "",
        "salarioMensual": "",
        "identificadorNomina": ""
    }

    function CargarDatosEmpleado (){
        
        $scope.DatosCrearEmpleado.cedula = $scope.SelectedNroDocumento;
        $scope.DatosCrearEmpleado.nombre = $scope.SelectedNombre;
        $scope.DatosCrearEmpleado.salarioMensual = $scope.SelectedSalarioMensual;
        $scope.DatosCrearEmpleado.identificadorNomina = $scope.SelectedIdNomina;
    }


    $scope.funcionesConOperacionFiltrado.cargarNrosDocumento();

    $scope.SelectorsPeriodo = ["012016", "022016", "032016"];
    $scope.SelectorsIdNomina = ["N-E", "N-A", "N-I", "N-D"];
    
    $scope.filtroDocumento = "";
    $scope.SelectedPeriodo = "";
    $scope.SelectedTipoContrato = "";
    $scope.SelectedNroDocumento = "";
    $scope.ClassActive = "";

    $scope.SelectedNombre = "";
    $scope.SelectedSalarioMensual = "";
    $scope.SelectedIdNomina = "";

    $scope.filterValue = "";
    $scope.CleanFields = CleanFields;
    $scope.CargarEmpleados = CargarEmpleados;
    $scope.getUniqueEmpleado = getUniqueEmpleado;
    $scope.CrearEmpleado = CrearEmpleado;
    $scope.EditarEmpleado = EditarEmpleado;
    $scope.CargarDatosEmpleado = CargarDatosEmpleado;
    
    
    
    //Función para cargar todos los registros de empleados
    function CargarEmpleados() {
        var promise = ngservice.getEmpleados();
        promise.then(function (resp) {
            $scope.Empleados = resp.data;
            console.log($scope.Empleados);
            $scope.Message = "La petición se ha completado satisfactoriamente";
        }, function (err) {
            $scope.Message = "Petición fallida" + err.status;
        });
    };

    //Función para crear un empleado
    function CrearEmpleado() {
        CargarDatosEmpleado();
        console.log($scope.DatosCrearEmpleado);
        var promise = ngservice.crearEmpleado($scope.DatosCrearEmpleado);
        promise.then(function (resp) {
            alert ("Empleado agregado exitosamente!")
            $scope.Message = "La petición se ha completado satisfactoriamente";
        }, function (err) {
            $scope.Message = "Petición fallida" + err.status;
        });
    };

    //Función para editar un empleado
    function EditarEmpleado() {
        CargarDatosEmpleado();
        console.log($scope.DatosCrearEmpleado);

        var promise = ngservice.editarEmpleado($scope.DatosCrearEmpleado);
        promise.then(function (resp) {
            alert("Empleado editado exitosamente!")
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
    };

     //Function para cargar registros de nómina según número de documento
     function getUniqueEmpleado() {
        var promise = ngservice.getUniqueEmpleado($scope.SelectedNroDocumento);
        promise.then(function (resp) {
            $scope.Empleado = resp.data;
            console.log($scope.Empleado);
            $scope.ClassActive = "active";

            $scope.SelectedNombre = $scope.Empleado.nombre;
            $scope.SelectedSalarioMensual = $scope.Empleado.salarioMensual;
            $scope.SelectedIdNomina = $scope.Empleado.identificadorNomina;
            $scope.Message = "La petición se ha completado satisfactoriamente";
        }, function (err) {
            $scope.Message = "Petición fallida" + err.status;
        });
    };
});
