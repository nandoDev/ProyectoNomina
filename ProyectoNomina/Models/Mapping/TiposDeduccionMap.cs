using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace ProyectoNomina.Models.Mapping
{
    public class TiposDeduccionMap : EntityTypeConfiguration<TiposDeduccion>
    {
        public TiposDeduccionMap()
        {
            // Primary Key
            this.HasKey(t => t.idTiposDeduccion);

            // Properties
            this.Property(t => t.nombre)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.estado)
                .IsRequired()
                .IsFixedLength()
                .HasMaxLength(1);

            // Table & Column Mappings
            this.ToTable("TiposDeduccion");
            this.Property(t => t.idTiposDeduccion).HasColumnName("idTiposDeduccion");
            this.Property(t => t.nombre).HasColumnName("nombre");
            this.Property(t => t.dependeDeSalario).HasColumnName("dependeDeSalario");
            this.Property(t => t.estado).HasColumnName("estado");
            this.Property(t => t.porcentaje).HasColumnName("porcentaje");
        }
    }
}
