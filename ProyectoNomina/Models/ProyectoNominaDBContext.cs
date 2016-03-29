using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using ProyectoNomina.Models.Mapping;

namespace ProyectoNomina.Models
{
    public partial class ProyectoNominaDBContext : DbContext
    {
        static ProyectoNominaDBContext()
        {
            Database.SetInitializer<ProyectoNominaDBContext>(null);
        }

        public ProyectoNominaDBContext()
            : base("Name=NominaDBContext")
        {
        }

        public DbSet<AsientosContables> AsientosContables { get; set; }
        public DbSet<Empleados> Empleados { get; set; }
        public DbSet<TiposDeduccion> TiposDeduccion { get; set; }
        public DbSet<TiposIngreso> TiposIngreso { get; set; }
        public DbSet<Transacciones> Transacciones { get; set; }
        public DbSet<Usuarios> Usuarios { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new AsientosContablesMap());
            modelBuilder.Configurations.Add(new EmpleadosMap());
            modelBuilder.Configurations.Add(new TiposDeduccionMap());
            modelBuilder.Configurations.Add(new TiposIngresoMap());
            modelBuilder.Configurations.Add(new TransaccionesMap());
            modelBuilder.Configurations.Add(new UsuariosMap());
        }
    }
}
