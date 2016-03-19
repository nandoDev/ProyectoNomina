using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace ProyectoNomina.Models.Mapping
{
    public class AsientosContablesMap : EntityTypeConfiguration<AsientosContables>
    {
        public AsientosContablesMap()
        {
            // Primary Key
            this.HasKey(t => t.idAsiento);

            // Properties
            this.Property(t => t.idAsiento)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.descripcion)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.cuenta)
                .IsRequired()
                .HasMaxLength(10);

            this.Property(t => t.periodoNomina)
                .IsRequired()
                .HasMaxLength(10);

            this.Property(t => t.tipoMovimiento)
                .IsRequired()
                .IsFixedLength()
                .HasMaxLength(2);

            this.Property(t => t.estado)
                .IsRequired()
                .IsFixedLength()
                .HasMaxLength(1);

            // Table & Column Mappings
            this.ToTable("AsientosContables");
            this.Property(t => t.idAsiento).HasColumnName("idAsiento");
            this.Property(t => t.descripcion).HasColumnName("descripcion");
            this.Property(t => t.idEmpleado).HasColumnName("idEmpleado");
            this.Property(t => t.cuenta).HasColumnName("cuenta");
            this.Property(t => t.periodoNomina).HasColumnName("periodoNomina");
            this.Property(t => t.tipoMovimiento).HasColumnName("tipoMovimiento");
            this.Property(t => t.fechaAsiento).HasColumnName("fechaAsiento");
            this.Property(t => t.monto).HasColumnName("monto");
            this.Property(t => t.estado).HasColumnName("estado");

            // Relationships
            this.HasRequired(t => t.Empleado)
                .WithMany(t => t.AsientosContables)
                .HasForeignKey(d => d.idEmpleado);

        }
    }
}
