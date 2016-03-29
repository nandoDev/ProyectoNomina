using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace ProyectoNomina.Models.Mapping
{
    public class TiposIngresoMap : EntityTypeConfiguration<TiposIngreso>
    {
        public TiposIngresoMap()
        {
            // Primary Key
            this.HasKey(t => t.idTiposIngreso);

            // Properties
            this.Property(t => t.idTiposIngreso)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.nombre)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.estado)
                .IsRequired()
                .IsFixedLength()
                .HasMaxLength(1);

            // Table & Column Mappings
            this.ToTable("TiposIngreso");
            this.Property(t => t.idTiposIngreso).HasColumnName("idTiposIngreso");
            this.Property(t => t.nombre).HasColumnName("nombre");
            this.Property(t => t.dependeDeSalario).HasColumnName("dependeDeSalario");
            this.Property(t => t.estado).HasColumnName("estado");
        }
    }
}
