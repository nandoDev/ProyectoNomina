using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProyectoNomina.Models
{
    public partial class TiposDeduccion
    {
        public TiposDeduccion()
        {
            this.Transacciones = new List<Transacciones>();
        }
        [Key]
        public int idTiposDeduccion { get; set; }
        public string nombre { get; set; }
        public bool dependeDeSalario { get; set; }
        public string estado { get; set; }
        public Nullable<decimal> porcentaje { get; set; }
        public virtual ICollection<Transacciones> Transacciones { get; set; }
    }
}
