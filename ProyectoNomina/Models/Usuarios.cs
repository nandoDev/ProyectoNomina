using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProyectoNomina.Models
{
    public partial class Usuarios
    {
        [Key]
        public int idUsuario { get; set; }
        public string NombreUsuario { get; set; }
        public string Contraseña { get; set; }
    }
}
