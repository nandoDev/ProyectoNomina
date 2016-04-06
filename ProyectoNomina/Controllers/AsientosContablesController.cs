using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using ProyectoNomina.Models;

namespace ProyectoNomina.Controllers
{
    public class AsientosContablesController : ApiController
    {
        private ProyectoNominaDBContext db = new ProyectoNominaDBContext();

        // GET: api/AsientosContables
        public IQueryable<AsientosContables> GetAsientosContables()
        {
            return db.AsientosContables;
        }

        // GET: api/AsientosContables/5
        [ResponseType(typeof(AsientosContables))]
        [System.Web.Http.Route("api/AsientosContables/GetAsientosPeriodo/{value1}")]
        public IHttpActionResult GetAsientosPeriodo(string value1)
        {

            var Result = db.AsientosContables.Select(u => new {
                u.idAsiento,
                u.descripcion,
                u.Empleado.cedula,
                u.Empleado.nombre,
                u.cuenta,
                u.periodoNomina,
                u.tipoMovimiento,
                u.fechaAsiento,
                u.monto
            }).Where(u=>u.periodoNomina==value1);
            return Ok(Result);
        }

        // PUT: api/AsientosContables/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAsientosContables(int id, AsientosContables asientosContables)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != asientosContables.idAsiento)
            {
                return BadRequest();
            }

            db.Entry(asientosContables).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AsientosContablesExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/AsientosContables
        [ResponseType(typeof(AsientosContables))]
        public IHttpActionResult PostAsientosContables(AsientosContables asientosContables)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.AsientosContables.Add(asientosContables);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = asientosContables.idAsiento }, asientosContables);
        }

        // DELETE: api/AsientosContables/5
        [ResponseType(typeof(AsientosContables))]
        public IHttpActionResult DeleteAsientosContables(int id)
        {
            AsientosContables asientosContables = db.AsientosContables.Find(id);
            if (asientosContables == null)
            {
                return NotFound();
            }

            db.AsientosContables.Remove(asientosContables);
            db.SaveChanges();

            return Ok(asientosContables);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AsientosContablesExists(int id)
        {
            return db.AsientosContables.Count(e => e.idAsiento == id) > 0;
        }
    }
}