$(function () {
    $('.autocomplete-with-hidden-multiplefilter').autocomplete({
        minLength: 0,
        source: function (request, response) {
            var url = $(this.element).data('url');

            $.getJSON(url, { term: request.term }, function (data) {
                response(data);
            })
        },
        select: function (event, ui) {
            $(event.target).next('input[type=hidden]').val(ui.item.id);

        },
        change: function (event, ui) {
            if (!ui.item) {
                $(event.target).val('').next('input[type=hidden]').val('');

            }
        }
    });
})

$(function () {
    $('.autocomplete-with-hidden').autocomplete({
        minLength: 0,
        source: function (request, response) {
            var url = $(this.element).data('url');
   
            $.getJSON(url, { term: request.term }, function (data) {
                response(data);
            })
        },
        select: function (event, ui) {
            $(event.target).next('input[type=hidden]').val(ui.item.id).next('').val('').next('#Articulo_Costo').val(ui.item.costo);
           
        },
        change: function(event, ui) {
            if (!ui.item) {
                $(event.target).val('').next('input[type=hidden]').val('').next('input[type=text]').val('');
               
            }
        }        
    });
})
$(document).ready(function (e) {
    $("#IdCafeteria").val("");
    $("#IdEmpleado").val("");
    $("#IdUsuario").val("");
    $("#FechaFinal").val("");
    $("#FechaInicial").val("");
});

$(document).ready(function (e) {
    $("#FechaIngreso").datepicker();
    $("#FechaInicial").datepicker();
    $("#FechaFinal").datepicker();
});

$(document).ready(function (e){
    var d = new Date();
    var time = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    $("#fechaRegistro").val(time);
    $("#FechaRegistro").val(time);
    $("#FechayHora").val(time);
});

function precioTotalDetalleVenta() {
    var n1 = document.getElementById("Cantidad").value;
    var n2 = document.getElementById("Articulo_Costo").value;
    var resultado = (n1)*(n2);
    document.getElementById("PrecioTotal").value = resultado;
}


