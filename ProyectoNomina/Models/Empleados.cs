using System;
using System.Collections.Generic;

namespace ProyectoNomina.Models
{
    public partial class Empleados
    {
        public Empleados()
        {
            this.AsientosContables = new List<AsientosContables>();
            this.Transacciones = new List<Transacciones>();
        }

        public int idEmpleado { get; set; }
        public string cedula { get; set; }
        public string nombre { get; set; }
        public decimal salarioMensual { get; set; }
        public string identificadorNomina { get; set; }
        public virtual ICollection<AsientosContables> AsientosContables { get; set; }
        public virtual ICollection<Transacciones> Transacciones { get; set; }
    }
}
