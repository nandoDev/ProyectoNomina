using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ProyectoNomina.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }

        public ActionResult GestionEmpleados()
        {
            ViewBag.Title = "Gestión empleados";

            return View();
        }

        public ActionResult GestionTiposIngreso()
        {
            ViewBag.Title = "Gestión de tipos de ingreso";

            return View();
        }

        public ActionResult GestionTiposDeduccion()
        {
            ViewBag.Title = "Gestión de tipos de deducción";

            return View();
        }

        public ActionResult GestionTransacciones()
        {
            ViewBag.Title = "Gestión de transacciones";

            return View();
        }

        public ActionResult GestionConsultas()
        {
            ViewBag.Title = "Gestión de consultas";

            return View();
        }

        public ActionResult GestionAsientosContables()
        {
            ViewBag.Title = "Gestión de asientos contables";

            return View();
        }
    }
}


