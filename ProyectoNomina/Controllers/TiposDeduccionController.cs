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
    public class TiposDeduccionController : ApiController
    {
        ProyectoNominaDBContext db;
        public TiposDeduccionController()
        {
            db = new ProyectoNominaDBContext();
        }

        // GET: api/TiposDeduccion
        public IEnumerable<TiposDeduccion> GetTiposDeduccion()
        {
            return db.TiposDeduccion.AsEnumerable();
        }

        // GET: api/TiposDeduccion/5
        [ResponseType(typeof(TiposDeduccion))]
        public IHttpActionResult GetTiposDeduccion(int id)
        {
            TiposDeduccion tiposDeduccion = db.TiposDeduccion.Find(id);
            if (tiposDeduccion == null)
            {
                return NotFound();
            }

            return Ok(tiposDeduccion);
        }

        // PUT: api/TiposDeduccion/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTiposDeduccion(int id, TiposDeduccion tiposDeduccion)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tiposDeduccion.idTiposDeduccion)
            {
                return BadRequest();
            }

            db.Entry(tiposDeduccion).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TiposDeduccionExists(id))
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

        // POST: api/TiposDeduccion
        [ResponseType(typeof(TiposDeduccion))]
        public IHttpActionResult PostTiposDeduccion(TiposDeduccion tiposDeduccion)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.TiposDeduccion.Add(tiposDeduccion);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = tiposDeduccion.idTiposDeduccion }, tiposDeduccion);
        }

        // DELETE: api/TiposDeduccion/5
        [ResponseType(typeof(TiposDeduccion))]
        public IHttpActionResult DeleteTiposDeduccion(int id)
        {
            TiposDeduccion tiposDeduccion = db.TiposDeduccion.Find(id);
            if (tiposDeduccion == null)
            {
                return NotFound();
            }

            db.TiposDeduccion.Remove(tiposDeduccion);
            db.SaveChanges();

            return Ok(tiposDeduccion);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TiposDeduccionExists(int id)
        {
            return db.TiposDeduccion.Count(e => e.idTiposDeduccion == id) > 0;
        }
    }
}