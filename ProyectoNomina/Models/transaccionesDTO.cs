using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ProyectoNomina.Models
{
    public class transaccionesDTO
    {
        public int idTransaccion {get; set;}
        public string cedulaEmpleado { get; set;}
        public string nombreEmpleado { get; set;}
        public string tipoTransaccion { get; set;}
        public string tipoIngreso { get; set; }
        public string tipoDeduccion { get; set; }
        public string periodoNomina { get; set; }
        public DateTime fecha { get; set; }
        public decimal montoTransaccion { get; set; }

    }
}