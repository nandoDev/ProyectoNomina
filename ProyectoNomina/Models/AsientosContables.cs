using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProyectoNomina.Models
{
    public partial class AsientosContables
    {
        [Key]
        public int idAsiento { get; set; }
        public string descripcion { get; set; }
        public int idEmpleado { get; set; }
        public string cuenta { get; set; }
        public string periodoNomina { get; set; }
        public string tipoMovimiento { get; set; }
        public System.DateTime fechaAsiento { get; set; }
        public decimal monto { get; set; }
        public string estado { get; set; }
        public virtual Empleados Empleado { get; set; }
    }
}
