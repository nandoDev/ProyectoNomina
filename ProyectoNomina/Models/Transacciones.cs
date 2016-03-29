using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProyectoNomina.Models
{
    public partial class Transacciones
    {
        [Key]
        public int idTransaccion { get; set; }
        public int idEmpleado { get; set; }
        public int idTiposIngreso { get; set; }
        public int idTiposDeduccion { get; set; }
        public string tipoTransaccion { get; set; }
        public System.DateTime fecha { get; set; }
        public string periodoNomina { get; set; }
        public decimal monto { get; set; }
        public string estado { get; set; }
        public virtual Empleados Empleado { get; set; }
        public virtual TiposDeduccion TiposDeduccion { get; set; }
        public virtual TiposIngreso TiposIngreso { get; set; }
    }
}
