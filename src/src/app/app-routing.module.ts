import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import jsonStrings from '@stringResources/app-strings.json';

const routes: Routes = [
  {
    path: "test",
    loadChildren: () => import("./test/test.module").then(m => m.TestModule),
    data: {
      title: "Implementación de componentes Angular 8 GOV.CO"
    }
  },
  {
    path: "servicios-y-tramites/minjusticia/agendamiento-consultorios/S007",
    loadChildren: () => import("./tramites/minjusticia/consultorios-juridicos/consultorios-juridicos.module").then(m => m.ConsultoriosJuridicosModule),
    data: {
      title: jsonStrings.tramites.minjusticia["consultorios-juridicos"].title
    }
  },
  {
    path: "censoindigena",
    loadChildren: () => import("./tramites/mininterior/censo-indigena/censo-indigena.module").then(m => m.CensoIndigenaModule),
    data: {
      title: jsonStrings.tramites.mininterior["censo-indigena"].title
    }
  },
  {
    path: "minsalud-consulta",
    loadChildren: () => import("./tramites/minsalud-consulta/minsalud-consulta.module").then(m => m.MinsaludConsultaModule),
    data: {
      title: jsonStrings.tramites.minsalud["consulta"].title
    }
  },
  {
    path: "servicios-y-tramites/SENA/certificados-y-constancias-academicas/T1033",
    loadChildren: () => import("./tramites/sena/certificados-constancias/sena.module").then(m => m.SenaModule),
    data: {
      title: "Certificados y constancias académicas"
    }
  },
  {
    path: "servicios-y-tramites/ICBF/expedicion-estado-cuenta-aportes-parafiscales/T7760",
    loadChildren: () => import("./tramites/icbf/aportes-parafiscales/aportes-parafiscales.module").then(m => m.AportesParafiscalesModule),
    data: {
      title: "Estado de cuenta"
    }
  },
  {
    path:  "ficha-tramite/:id",
    loadChildren: () => import("./tramites/fichatramite/ficha-tramite.module").then(m => m.FichaTramiteModule),
    data: {
      title: ""
    }
  },
  {
    path: "servicios-y-tramites/dps/consulta-estado-vinculacion/T45250",
    loadChildren: () => import("./tramites/dps/dps.module").then(m => m.DpsModule),
    data: {
      title: jsonStrings.tramites.dps["consulta"].title
    }
  },
  {
    path: "autorizar-exportacion",
    loadChildren: () => import("./tramites/mincultura/autorizar-exportacion/autorizar-exportacion.module").then(m => m.AutorizarExportacionModule),
    data: {
      title: jsonStrings.tramites.mincultura["consulta"].title
    }
  },
  {
    path: "servicios-y-tramites/contraloria/certificado-de-antecedentes/T17084",
    loadChildren: () => import("./tramites/contraloria/antecedentes-fiscales/antecedentes-fiscales.module").then(m => m.AntecedentesFiscalesModule),
    data: {
      title: jsonStrings.tramites.contraloria["antecedentes-fiscales"].title
    }
  },
  {
    path: "servicios-y-tramites/invima/revision-informacion-consulta-productos/T11625",
    loadChildren: () => import("./tramites/invima/invima.module").then(m => m.InvimaModule),
    data: {
      title: "Consulta de Registro Sanitario"
    }
  },
  {
    path: "obtener-copia-rut",
    loadChildren: () => import("./tramites/dian/rut/rut.module").then(m => m.RutModule),
    data: {
      title: jsonStrings.tramites.dian["rut"].title
    }
  },
  {
    path: "cancilleria",
    loadChildren: () => import("./tramites/cancilleria/tramitar-pasaporte/tramitar-pasaporte.module").then(m => m.TramitarPasaporteModule),
    data: {
      title: jsonStrings.tramites.cancilleria["tramitar-pasaporte"].title
    }
  },
  {
    path: "servicios-y-tramites/mintransporte/certificado-licencia-conduccion/S002",
    loadChildren: () => import("./tramites/mintransporte/licencia-conduccion/licencia-conduccion.module").then(m => m.LicenciaConduccionModule),
    data: {
      title: jsonStrings.tramites.mintransporte["licencia-conduccion"].title
    }
  },
  {
    path: "servicios-y-tramites/colpensiones/certificado-afiliacion-regimen-prima-media/S003",
    loadChildren: () => import("./tramites/colpensiones/certificado-afiliacion/certificado-afiliacion.module").then(m => m.CertificadoAfiliacionModule),
    data: {
      title: "Descargar certificado de afiliación"
    }
  },
  {
    path: "urt",
    loadChildren: () => import("./tramites/urt/urt.module").then(m => m.UrtModule),
    data: {
      title: jsonStrings.tramites.urt["consulta"].title
    }
  },
  {
    path: "servicios-y-tramites/fna/consulta-linea-impresion-recibo-pago-credito/T6292",
    loadChildren: () => import("./tramites/fna/fna.module").then(m => m.FnaModule),
    data: {
      title: jsonStrings.tramites.fna["recibo-pago-credito"].title
    }
  },
  {
    path: "sic",
    loadChildren: () => import("./tramites/sic/denuncia-infraccion/denuncia-infraccion.module").then(m => m.DenunciaInfraccionModule),
    data: {
      title: "Denuncia o queja por posible infracción a las normas de protección al consumidor"
    }
  },
  {
    path: "supernotariado",
    loadChildren: () => import("./tramites/supernotariado/certificado-tradicion-libertad/certificado-tradicion-libertad.module").then(m => m.CertificadoTradicionLibertadModule),
    data: {
      title: jsonStrings.tramites.supernotariado["certificado-tradicion-libertad"].title
    }
  },
  {
    path: "validar-gsmi",
    loadChildren: () => import("./tramites/ica/validar-gsmi/validar-gsmi.module").then(m => m.ValidarGsmiModule),
    data: {
      title: jsonStrings.tramites.ica["validar-gsmi"].title
    }
  },
  {
    path: "descargar-rspp",
    loadChildren: () => import("./tramites/ica/descargar-rspp/descargar-rspp.module").then(m => m.DescargarRsppModule),
    data: {
      title: jsonStrings.tramites.ica["descargar-rspp"].title
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
