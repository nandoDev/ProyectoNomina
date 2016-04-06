using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace ProyectoNomina.Models
{
    public class TiposIngresoDTO
    {
        
        public int idTiposIngreso { get; set; }

        [Index(IsUnique = true)]
        public string nombre { get; set; }
        public Nullable<bool> dependeDeSalario { get; set; }
        public string estado { get; set; }
    }
}