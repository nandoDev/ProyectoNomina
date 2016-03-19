namespace ProyectoNomina.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class first : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.AsientosContables",
                c => new
                    {
                        idAsiento = c.Int(nullable: false),
                        descripcion = c.String(nullable: false, maxLength: 50),
                        idEmpleado = c.Int(nullable: false),
                        cuenta = c.String(nullable: false, maxLength: 10),
                        periodoNomina = c.String(nullable: false, maxLength: 10),
                        tipoMovimiento = c.String(nullable: false, maxLength: 2, fixedLength: true),
                        fechaAsiento = c.DateTime(nullable: false),
                        monto = c.Decimal(nullable: false, precision: 18, scale: 2),
                        estado = c.String(nullable: false, maxLength: 1, fixedLength: true),
                    })
                .PrimaryKey(t => t.idAsiento)
                .ForeignKey("dbo.Empleados", t => t.idEmpleado, cascadeDelete: true)
                .Index(t => t.idEmpleado);
            
            CreateTable(
                "dbo.Empleados",
                c => new
                    {
                        idEmpleado = c.Int(nullable: false, identity: true),
                        cedula = c.String(nullable: false, maxLength: 15),
                        nombre = c.String(nullable: false, maxLength: 80),
                        salarioMensual = c.Decimal(nullable: false, precision: 18, scale: 2),
                        identificadorNomina = c.String(nullable: false, maxLength: 10),
                    })
                .PrimaryKey(t => t.idEmpleado);
            
            CreateTable(
                "dbo.Transacciones",
                c => new
                    {
                        idTransaccion = c.Int(nullable: false, identity: true),
                        idEmpleado = c.Int(nullable: false),
                        idTiposIngreso = c.Int(),
                        idTiposDeduccion = c.Int(),
                        tipoTransaccion = c.String(nullable: false, maxLength: 5),
                        fecha = c.DateTime(nullable: false),
                        periodoNomina = c.String(nullable: false, maxLength: 10),
                        monto = c.Decimal(nullable: false, precision: 18, scale: 2),
                        estado = c.String(maxLength: 1, fixedLength: true),
                    })
                .PrimaryKey(t => t.idTransaccion)
                .ForeignKey("dbo.Empleados", t => t.idEmpleado, cascadeDelete: true)
                .ForeignKey("dbo.TiposDeduccion", t => t.idTiposDeduccion)
                .ForeignKey("dbo.TiposIngreso", t => t.idTiposIngreso)
                .Index(t => t.idEmpleado)
                .Index(t => t.idTiposIngreso)
                .Index(t => t.idTiposDeduccion);
            
            CreateTable(
                "dbo.TiposDeduccion",
                c => new
                    {
                        idTiposDeduccion = c.Int(nullable: false, identity: true),
                        nombre = c.String(nullable: false, maxLength: 20),
                        dependeDeSalario = c.Boolean(nullable: false),
                        estado = c.String(nullable: false, maxLength: 1, fixedLength: true),
                        porcentaje = c.Decimal(precision: 18, scale: 2),
                    })
                .PrimaryKey(t => t.idTiposDeduccion);
            
            CreateTable(
                "dbo.TiposIngreso",
                c => new
                    {
                        idTiposIngreso = c.Int(nullable: false, identity: true),
                        nombre = c.String(nullable: false, maxLength: 20),
                        dependeDeSalario = c.Boolean(nullable: false),
                        estado = c.String(nullable: false, maxLength: 1, fixedLength: true),
                    })
                .PrimaryKey(t => t.idTiposIngreso);
            
            CreateTable(
                "dbo.Usuarios",
                c => new
                    {
                        idUsuario = c.Int(nullable: false, identity: true),
                        NombreUsuario = c.String(nullable: false, maxLength: 15),
                        Contraseña = c.String(nullable: false, maxLength: 10),
                    })
                .PrimaryKey(t => t.idUsuario);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.AsientosContables", "idEmpleado", "dbo.Empleados");
            DropForeignKey("dbo.Transacciones", "idTiposIngreso", "dbo.TiposIngreso");
            DropForeignKey("dbo.Transacciones", "idTiposDeduccion", "dbo.TiposDeduccion");
            DropForeignKey("dbo.Transacciones", "idEmpleado", "dbo.Empleados");
            DropIndex("dbo.Transacciones", new[] { "idTiposDeduccion" });
            DropIndex("dbo.Transacciones", new[] { "idTiposIngreso" });
            DropIndex("dbo.Transacciones", new[] { "idEmpleado" });
            DropIndex("dbo.AsientosContables", new[] { "idEmpleado" });
            DropTable("dbo.Usuarios");
            DropTable("dbo.TiposIngreso");
            DropTable("dbo.TiposDeduccion");
            DropTable("dbo.Transacciones");
            DropTable("dbo.Empleados");
            DropTable("dbo.AsientosContables");
        }
    }
}
