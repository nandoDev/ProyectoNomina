using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProyectoNomina.Models
{
    public partial class TiposIngreso
    {
        public TiposIngreso()
        {
            this.Transacciones = new List<Transacciones>();
        }
        [Key]
        public int idTiposIngreso { get; set; }
        public string nombre { get; set; }
        public bool dependeDeSalario { get; set; }
        public string estado { get; set; }
        public virtual ICollection<Transacciones> Transacciones { get; set; }
    }
}
