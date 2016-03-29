using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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

        [Index(IsUnique=true)]
        public string nombre { get; set; }
        public Nullable<bool> dependeDeSalario { get; set; }
        public string estado { get; set; }
        public virtual ICollection<Transacciones> Transacciones { get; set; }
    }
}
