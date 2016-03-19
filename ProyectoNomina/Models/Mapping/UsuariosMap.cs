using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace ProyectoNomina.Models.Mapping
{
    public class UsuariosMap : EntityTypeConfiguration<Usuarios>
    {
        public UsuariosMap()
        {
            // Primary Key
            this.HasKey(t => t.idUsuario);

            // Properties
            this.Property(t => t.NombreUsuario)
                .IsRequired()
                .HasMaxLength(15);

            this.Property(t => t.Contraseña)
                .IsRequired()
                .HasMaxLength(10);

            // Table & Column Mappings
            this.ToTable("Usuarios");
            this.Property(t => t.idUsuario).HasColumnName("idUsuario");
            this.Property(t => t.NombreUsuario).HasColumnName("NombreUsuario");
            this.Property(t => t.Contraseña).HasColumnName("Contraseña");
        }
    }
}
