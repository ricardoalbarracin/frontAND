import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerCertificadoComponent } from './components/container-certificado/container-certificado.component';
import { ConsultaIndicePropietariosComponent } from './components/consulta-indice-propietarios/consulta-indice-propietarios.component';
import { ResumenConsultaComponent } from './components/resumen-consulta/resumen-consulta.component';
import { DatosSolicitanteComponent } from './components/datos-solicitante/datos-solicitante.component';
import { ValidacionCertificadoComponent } from './components/validacion-certificado/validacion-certificado.component';
import { GenerarCertificadoComponent } from './components/generar-certificado/generar-certificado.component';
import { ResumenPagoComponent } from './components/resumen-pago/resumen-pago.component';
import { CertificadoNoPropiedadComponent } from './components/certificado-no-propiedad/certificado-no-propiedad.component';
import { InfoNumeroPinComponent } from './components/info-numero-pin/info-numero-pin.component';
import { InfoMatriculaComponent } from './components/info-matricula/info-matricula.component';
import { PagoPseComponent } from './components/pago-pse/pago-pse.component';
import { CarritoComprasComponent } from './components/carrito-compras/carrito-compras.component';

const routes: Routes = [
  {
    path: "",
    component: ContainerCertificadoComponent,
    children: [
      { 
        path: "consultaIndicePropietarios",
        component: ConsultaIndicePropietariosComponent        
      },
      { 
        path: "resumenConsulta",
        component: ResumenConsultaComponent        
      },
      { 
        path: "datosSolicitante",
        component: DatosSolicitanteComponent        
      },
      { 
        path: "validacionCertificado",
        component: ValidacionCertificadoComponent        
      },
      { 
        path: "generarCertificado",
        component: GenerarCertificadoComponent        
      },
      { 
        path: "resumenPago",
        component: ResumenPagoComponent        
      },
      { 
        path: "certificadoNoPropiedad",
        component: CertificadoNoPropiedadComponent        
      },
      { 
        path: "infoNumeroPin",
        component: InfoNumeroPinComponent        
      },
      { 
        path: "informacionMatricula",
        component: InfoMatriculaComponent        
      },
      { 
        path: "pagoPse",
        component: PagoPseComponent        
      },
      { 
        path: "carritoCompras",
        component: CarritoComprasComponent        
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CertificadoTradicionLibertadRoutingModule { }
