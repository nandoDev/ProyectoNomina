using Newtonsoft.Json;
using ProyectoNomina.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Description;
using System.Net;

using System.Windows.Forms;
using System.Data.Entity;
using System.Web.Mvc;

namespace ProyectoNomina.Controllers
{
   


    public class EmpleadosController : ApiController
    {

        ProyectoNominaDBContext db;
        public EmpleadosController()
        {
            db = new ProyectoNominaDBContext();
        }

        // GET: api/EmpleadosController
        public IEnumerable<Empleados> GetEmpleados()
        {
            return db.Empleados.AsEnumerable();
        }

        
        [ResponseType(typeof(Empleados))]
        [System.Web.Http.Route("api/Empleados/GetEmpleado/{value1}")]
        public IHttpActionResult GetEmpleado(string value1)
        {
            var empleado = db.Empleados.Single(u => u.cedula.Equals(value1));

            //Empleados empleado = db.Empleados.Find(id);
            if (empleado == null)
            {
                return NotFound();
            }
            return Ok(empleado);
        }

        // POST: api/NominaProfesores
        //[ResponseType(typeof(Empleados))]


        [System.Web.Http.AcceptVerbs("PUT", "POST")]
        public IHttpActionResult CrearEmpleado([FromBody]Empleados value1)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            db.Empleados.Add(value1);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (EmpleadoExists(value1.cedula))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }
            return Ok();
        }

        [System.Web.Http.AcceptVerbs("PUT", "POST")]
        public IHttpActionResult EditarEmpleado([FromBody]Empleados empleado)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!EmpleadoExists(empleado.cedula))
            {
                return NotFound();
            }
            else
            {
                var editEmpleado = db.Empleados.Single(u => u.cedula.Equals(empleado.cedula));
                editEmpleado.nombre = empleado.nombre;
                editEmpleado.salarioMensual = Convert.ToDecimal(empleado.salarioMensual);
                editEmpleado.identificadorNomina = empleado.identificadorNomina;

                db.Entry(editEmpleado).State = EntityState.Modified;

                try
                {
                    db.SaveChanges();
                }
                catch (DbUpdateException)
                {
                    throw;
                }
            }
            return Ok();
        }

        private bool EmpleadoExists(string cedula)
        {
            return db.Empleados.Count(e => e.cedula == cedula) > 0;
        }

        // GET api/values
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }

        // GET: api/NominaProfesores/5
        //[ResponseType(typeof(NominaProfesores))]
        public dynamic GetAutoCompleteNroDocumento(string value1)
        {
            try
            {
                Empleados[] matching = string.IsNullOrWhiteSpace(value1) ?
                 null
                 : db.Empleados.Where(i => i.cedula.ToUpper().StartsWith(value1.ToUpper())).Distinct().ToArray();

                return Json(matching.Select(m => new
                {
                    id = m.idEmpleado,
                    value = m.cedula,
                }));
            }
            catch (Exception ex)
            {
            }
            return null;
        }

        // GET: api/Empleados/
        //[ResponseType(typeof(NominaProfesores))]
        public dynamic GetDataAutoComplete()
        {
            try
            {
                Empleados[] matching = db.Empleados.Distinct().ToArray();

                return Json(matching.Select(m => new
                {
                    id = m.cedula,
                }));
            }
            catch (Exception ex)
            {
            }
            return null;
        }

    }
}
