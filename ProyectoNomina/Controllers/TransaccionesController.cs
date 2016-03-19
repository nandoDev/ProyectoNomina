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
    public class TransaccionesController : ApiController
    {
        private ProyectoNominaDBContext db = new ProyectoNominaDBContext();

        // GET: api/Transacciones
        public IQueryable<Transacciones> GetTransacciones()
        {
            return db.Transacciones;
        }

        // GET: api/Transacciones/5
        [ResponseType(typeof(Transacciones))]
        public IHttpActionResult GetTransacciones(int id)
        {
            Transacciones transacciones = db.Transacciones.Find(id);
            if (transacciones == null)
            {
                return NotFound();
            }

            return Ok(transacciones);
        }

        // PUT: api/Transacciones/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTransacciones(int id, Transacciones transacciones)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != transacciones.idTransaccion)
            {
                return BadRequest();
            }

            db.Entry(transacciones).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TransaccionesExists(id))
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

        // POST: api/Transacciones
        [ResponseType(typeof(Transacciones))]
        public IHttpActionResult PostTransacciones(Transacciones transacciones)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Transacciones.Add(transacciones);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = transacciones.idTransaccion }, transacciones);
        }

        // DELETE: api/Transacciones/5
        [ResponseType(typeof(Transacciones))]
        public IHttpActionResult DeleteTransacciones(int id)
        {
            Transacciones transacciones = db.Transacciones.Find(id);
            if (transacciones == null)
            {
                return NotFound();
            }

            db.Transacciones.Remove(transacciones);
            db.SaveChanges();

            return Ok(transacciones);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TransaccionesExists(int id)
        {
            return db.Transacciones.Count(e => e.idTransaccion == id) > 0;
        }
    }
}