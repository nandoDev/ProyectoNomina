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
    public class TiposIngresoController : ApiController
    {
        private ProyectoNominaDBContext db = new ProyectoNominaDBContext();

        // GET: api/TiposIngreso
        public IQueryable<TiposIngreso> GetTiposIngreso()
        {
            return db.TiposIngreso;
        }

        // GET: api/TiposIngreso/5
        [ResponseType(typeof(TiposIngreso))]
        public IHttpActionResult GetTiposIngreso(int id)
        {
            TiposIngreso tiposIngreso = db.TiposIngreso.Find(id);
            if (tiposIngreso == null)
            {
                return NotFound();
            }

            return Ok(tiposIngreso);
        }

        // PUT: api/TiposIngreso/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTiposIngreso(int id, TiposIngreso tiposIngreso)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tiposIngreso.idTiposIngreso)
            {
                return BadRequest();
            }

            db.Entry(tiposIngreso).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TiposIngresoExists(id))
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

        // POST: api/TiposIngreso
        [ResponseType(typeof(TiposIngreso))]
        public IHttpActionResult PostTiposIngreso(TiposIngreso tiposIngreso)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.TiposIngreso.Add(tiposIngreso);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = tiposIngreso.idTiposIngreso }, tiposIngreso);
        }

        // DELETE: api/TiposIngreso/5
        [ResponseType(typeof(TiposIngreso))]
        public IHttpActionResult DeleteTiposIngreso(int id)
        {
            TiposIngreso tiposIngreso = db.TiposIngreso.Find(id);
            if (tiposIngreso == null)
            {
                return NotFound();
            }

            db.TiposIngreso.Remove(tiposIngreso);
            db.SaveChanges();

            return Ok(tiposIngreso);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TiposIngresoExists(int id)
        {
            return db.TiposIngreso.Count(e => e.idTiposIngreso == id) > 0;
        }
    }
}