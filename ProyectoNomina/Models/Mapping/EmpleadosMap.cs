using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace ProyectoNomina.Models.Mapping
{
    public class EmpleadosMap : EntityTypeConfiguration<Empleados>
    {
        public EmpleadosMap()
        {
            // Primary Key
            this.HasKey(t => t.idEmpleado);

            // Properties
            this.Property(t => t.cedula)
                .IsRequired()
                .HasMaxLength(15);

            this.Property(t => t.nombre)
                .IsRequired()
                .HasMaxLength(80);

            this.Property(t => t.identificadorNomina)
                .IsRequired()
                .HasMaxLength(10);

            // Table & Column Mappings
            this.ToTable("Empleados");
            this.Property(t => t.idEmpleado).HasColumnName("idEmpleado");
            this.Property(t => t.cedula).HasColumnName("cedula");
            this.Property(t => t.nombre).HasColumnName("nombre");
            this.Property(t => t.salarioMensual).HasColumnName("salarioMensual");
            this.Property(t => t.identificadorNomina).HasColumnName("identificadorNomina");
        }
    }
}
