import { Component, OnInit } from '@angular/core';
import jsonStrings from '@stringResources/tramites/recibo-pago-credito.json';
import { UserModel } from '../../models/userModel';
import { ReciboPagoUtilsService } from '../../services/recibo-pago-utils.service';
import { UserService } from '../../services/user.service';
import { CreditDataModel } from '../../models/creditDataModel';
import { ReqListModel } from '../../models/reqListModel';
import { DocumentoModel } from '../../models/documentoModel';

@Component({
  selector: 'app-consulta-descarga-recibo',
  templateUrl: './consulta-descarga-recibo.component.html',
  styleUrls: ['./consulta-descarga-recibo.component.scss']
})
export class ConsultaDescargaReciboComponent implements OnInit {

  messages: any;
  hasCredits = false;
  downloadSuccess = false;
  creditsCount = 0;
  userData: UserModel;
  reqList: ReqListModel;
  creditList: CreditDataModel[];  
  failureRequest = false;
  creditoSeleccionado: number;
  theCheckboxValues: boolean[];
  estadosCredito: string[];
  documentoModel: DocumentoModel;
  descTipoDocumento: string;
  

  constructor(private ReciboPagoUtils: ReciboPagoUtilsService, private UserService: UserService) { }

  ngOnInit() { 

    

    this.messages = {
      noCredits: jsonStrings.messages.noCredits
    };

    // Obtiene la información del usuario
    this.userData = this.UserService.getUserLoggedIn();
    this.descTipoDocumento = this.UserService.getDescTipoDocumento(this.userData.tipoDocumento);

    // Arma la petición para el consultar el listado de productos
    this.reqList = {
      TipoDocumento: this.userData.tipoDocumento,
      NumeroDocumento: this.userData.documento
    };

    // Obtiene el listado de creditos
    this.ReciboPagoUtils.getCreditList(this.reqList).subscribe(
      //Success response
      response => {

        this.creditList = response.result;
        
        this.creditsCount = this.creditList.length;        

        // NO tiene creditos
        if (this.creditsCount == 0)
        {
          this.hasCredits = false;
          this.failureRequest = true;
          this.messages.failureRequest = jsonStrings.messages.noCredits;
          return;
        }

        // Inicializa arreglo para almacenar valores de los checkbox
        this.theCheckboxValues = [false];
        // Inicialica arreglo para almacenar descripción de los estados de los creditos
        this.estadosCredito = [this.UserService.getDescEstadoCredito(this.creditList[0].estado)];
        
        for (let i= 1; i<this.creditsCount;i++){
          // Inicializa por cada credito, el valor del checkbox en false
          this.theCheckboxValues.push(false);
          // Obtiene la descripcion correspondiente al estado del credito
          this.estadosCredito.push(this.UserService.getDescEstadoCredito(this.creditList[i].estado));

        }
        
        this.hasCredits = true;
      },
      // Failure response
      error => {
        this.failureRequest = true;
        this.hasCredits = false;
        this.messages.failureRequest = jsonStrings.messages.failureRequest;
        window.scroll(0, 0);
        return;
      }
    );
  }

  setStep(step: string) {
    const s = document.getElementsByTagName('govco-area-servicios');
    s[0].setAttribute('steptramites', step);
  }

  // Selecciona el credito que quiere descargar el recibo
  selectCredit(e, index: number){

    // Si el cambio del check es "Checked=true"
    if (e.target.checked){

      // Deselecciona los checkbox que no correspondan al que ha seleccionado
      for (let i= 0; i<this.creditsCount;i++){
        if (i!=index){
          this.theCheckboxValues[i]=(false);
        }        
      }
      // Guarda en variable el numero del credito que quiere descargar el recibo
      this.creditoSeleccionado = this.creditList[index].numero;
    }
    // Si el cambio del check es "Checked=false" 
    else{
      this.creditoSeleccionado = null;
    }        
  }

  //Descarga el recibo de pago seleccionado
  downloadDocument(){
    
    this.failureRequest = false;

    // Si ha seleccionado algun registro para generar el recibo
    if (this.creditoSeleccionado != null){

      //Arma el modelo para enviar al servicio
      this.documentoModel = {
        numero: this.creditoSeleccionado
      };
      
      // Llama al servicio para obtener el documento
      this.ReciboPagoUtils.descargar(this.documentoModel)
      .subscribe(
        (data)=> {

          const newBlob = new Blob([data], {type: 'application/pdf'});
          // IE
          if (window.navigator && window.navigator.msSaveOrOpenBlob && this.isIE()) {
            window.navigator.msSaveOrOpenBlob(newBlob);
            return;
          }
          // Otros navegadores
          const downloadURL = window.URL.createObjectURL(newBlob);
          const link = document.createElement('a');
          link.href = downloadURL;
          link.download = this.creditoSeleccionado + '.pdf';
          link.click();
          this.downloadSuccess = true;
          this.setStep('4');

        },
        (error) => {
            this.failureRequest = true;
            this.downloadSuccess = false;
            this.messages.failureRequest = 'Se produjo un error al procesar la solicitud';
            window.scroll(0, 0);
            return;
        }
      );
    }
    // SI no ha seleccionado ningún registro para descargar el documento
    else{
      this.failureRequest = true;
      this.downloadSuccess = false;
      this.messages.failureRequest = jsonStrings.messages.validateErrors;
    }
  }

  isIE() {
    const ua = navigator.userAgent;
    const isIe = ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1;
    return isIe;
  }

}
