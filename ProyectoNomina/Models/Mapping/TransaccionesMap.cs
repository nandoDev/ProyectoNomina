using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace ProyectoNomina.Models.Mapping
{
    public class TransaccionesMap : EntityTypeConfiguration<Transacciones>
    {
        public TransaccionesMap()
        {
            // Primary Key
            this.HasKey(t => t.idTransaccion);

            // Properties
            this.Property(t => t.tipoTransaccion)
                .IsRequired()
                .IsFixedLength()
                .HasMaxLength(1);

            this.Property(t => t.periodoNomina)
                .IsRequired()
                .HasMaxLength(10);

            this.Property(t => t.estado)
                .IsRequired()
                .IsFixedLength()
                .HasMaxLength(1);

            // Table & Column Mappings
            this.ToTable("Transacciones");
            this.Property(t => t.idTransaccion).HasColumnName("idTransaccion");
            this.Property(t => t.idEmpleado).HasColumnName("idEmpleado");
            this.Property(t => t.idTiposIngreso).HasColumnName("idTiposIngreso");
            this.Property(t => t.idTiposDeduccion).HasColumnName("idTiposDeduccion");
            this.Property(t => t.tipoTransaccion).HasColumnName("tipoTransaccion");
            this.Property(t => t.fecha).HasColumnName("fecha");
            this.Property(t => t.periodoNomina).HasColumnName("periodoNomina");
            this.Property(t => t.monto).HasColumnName("monto");
            this.Property(t => t.estado).HasColumnName("estado");

            // Relationships
            this.HasRequired(t => t.Empleado)
                .WithMany(t => t.Transacciones)
                .HasForeignKey(d => d.idEmpleado);
            this.HasRequired(t => t.TiposDeduccion)
                .WithMany(t => t.Transacciones)
                .HasForeignKey(d => d.idTiposDeduccion);
            this.HasRequired(t => t.TiposIngreso)
                .WithMany(t => t.Transacciones)
                .HasForeignKey(d => d.idTiposIngreso);

        }
    }
}
