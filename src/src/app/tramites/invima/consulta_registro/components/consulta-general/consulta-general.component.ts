import { Component, OnInit,ViewChild, Input  } from '@angular/core';
import { InvimaUtilsService} from '../../services/invima-utils.service'
import { GovcoTableModel, TableCellModel, TableConfigModel, TableHeaderModel } from '@shared/forms/models/table.model';
import { FILTER } from '@shared/forms/services/table-filters';
import { ConsultaGeneralATCHeader, ConsultaGeneralATCBody, IConsultaRegistro } from '../../models/consultaATC';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta-general',
  templateUrl: './consulta-general.component.html',
  styleUrls: ['./consulta-general.component.scss']
})
export class ConsultaGeneralComponent implements OnInit {  
  @Input() flagTrue: boolean;
  headerConsultaATC: ConsultaGeneralATCHeader;
  bodyConsultaATC: ConsultaGeneralATCBody[];
  public _isData = false;

  public tFilter: GovcoTableModel = {
    Header:  [
      {
        content: 'Expediente',
        filter: false,
        typeFilter: '',
        columnName: 'numeroexpediente',
        order: 1
      },
      {
        content: 'Nombre del producto',
        filter: false,
        typeFilter: '',
        columnName: 'nombreproducto',
        order: 2
      },
      {
        content: 'Registro sanitario',
        filter: false,
        typeFilter: '',
        columnName: 'numeroregistrosanitario',
        order: 3
      },
      {
        content: 'Fecha de vencimiento',
        filter: false,
        typeFilter: '',
        columnName: 'fechavencimiento',
        order: 5
      },
      {
        content: 'Modalidad',
        filter: false,
        typeFilter: '',
        columnName: 'modalidad',
        order: 6
      },
      {
        content: 'Estado registro',
        filter: false,
        typeFilter: '',
        columnName: 'estado',
        order: 4
      },
    ],
    Body: [],
    ConfigHeader: [],
    ConfigBody: [],
    ConfigFilter: []
  };

  resetHeaderIniciales(){

    this.tFilter.Header = [
        {
          content: 'Expediente',
          filter: false,
          typeFilter: '',
          columnName: 'numeroexpediente',
          order: 1
        },
        {
          content: 'Nombre del producto',
          filter: false,
          typeFilter: '',
          columnName: 'nombreproducto',
          order: 2
        },
        {
          content: 'Registro sanitario',
          filter: false,
          typeFilter: '',
          columnName: 'numeroregistrosanitario',
          order: 3
        },
        {
          content: 'Fecha de vencimiento',
          filter: false,
          typeFilter: '',
          columnName: 'fechavencimiento',
          order: 5
        },
        {
          content: 'Modalidad',
          filter: false,
          typeFilter: '',
          columnName: 'modalidad',
          order: 6
        },
        {
          content: 'Estado registro',
          filter: false,
          typeFilter: '',
          columnName: 'estado',
          order: 4
        },
      ];

    this.tFilter.Body = [];
    this.tFilter.ConfigHeader = [];
    this.tFilter.ConfigBody = [];
    //this.tFilter.ConfigFilter = [];
  }

  constructor(private invimaUtils:InvimaUtilsService, private router:Router) { 
    this.flagTrue = true;
    this.setTableFilterData();
  }

  ngOnInit() {   
    //this.resetHeaderIniciales();
  }

  setTableFilterData() {
    this._isData = false;
    this.resetHeaderIniciales();
    const configBody: TableConfigModel[] = [
      {columnName: 'numeroexpediente', columnType: 'string', class: 'col-width-10'},
      {columnName: 'nombreproducto', columnType: 'string', class: 'col-width-20'},
      {columnName: 'numeroregistrosanitario', columnType: 'string', class: 'col-width-10'},
      {columnName: 'estado', columnType: 'string', class: 'col-width-10'},
      {columnName: 'fechavencimiento', columnType: 'date', class: 'col-width-15'},
      {columnName: 'modalidad',  columnType: 'string', class: 'col-width-15'},
    ];

    const configHeader = [
      {class: 'col-width-10'},
      {class: 'col-width-20'},
      {class: 'col-width-10'},
      {class: 'col-width-10'},
      {class: 'col-width-15'},
      {class: 'col-width-15'},
    ];

    const configFilter = [
      { columnName: 'nombreproducto', type: 'order'},
      { columnName: 'estado', type: 'filter-content'},
      { columnName: 'fechavencimiento', type: 'date'},
      { columnName: 'modalidad', type: 'filter-content'}
    ];

    if(this.invimaUtils.getTipoConsulta === 1) {
      if(this.tFilter.Header.length === 6) {
        this.tFilter.Header.push(
          {
            content: 'Titulares',
            filter: false,
            typeFilter: '',
            columnName: 'titulares',
            order: 7
          });
      }
      configBody.push({columnName: 'titulares', columnType: 'string', class: 'col-width-10'});
      configHeader.push({class: 'col-width-15'});

    }

    this.tFilter.ConfigFilter = configFilter;
    this.tFilter.ConfigHeader = configHeader;
    this.tFilter.ConfigBody = configBody;

    //const header = this.tFilter.Header.sort((a, b) => a.order !== undefined && b.order !== undefined ? a.order - b.order : -1);
    let headerSort: TableHeaderModel[];
    headerSort =  this.tFilter.Header.sort((a, b) => a.order !== undefined && b.order !== undefined ? a.order - b.order : -1);
    const header = headerSort;

    if(this.invimaUtils.getTipoConsulta === 1) {
      this.invimaUtils.getConsultaRegistro(this.invimaUtils.tipoConsultaRegistro, 
        this.invimaUtils.groupConsultaRegistro ,
        this.invimaUtils.valueConsultaRegistro )
      .subscribe((data:IConsultaRegistro[]) => {
        this._isData = true;
        if (data != null){
          if(data.length === 0){
            this.invimaUtils.setDetail =false;
            this.invimaUtils.setError = true;
            this._isData = false;
            this.setStep('2');
            return true;
          }

          this._isData = true;
          this.setStep('4');          
          for(var item of data) {
            const listElements = [];
            for (const config of header) {
                      const cellData = item[config.columnName];
                      const el: TableCellModel = {
                        content: cellData,
                        class: item.estado === 'Vencido' ? 'color-green' : 'color-govco'
                      };

                      if (config.columnName === 'numeroexpediente') {
                        el.type = 'link-event';
                        el.class = 'btn btn-low';
                        el.event = this.openModal.bind(this, el);
                      }
                      if (config.columnName === 'fechavencimiento') {
                        el.content = this.convertStringToDate(cellData, '-');
                      }
                      listElements.push(el);
                    }
            this.tFilter.Body.push(listElements); 
          }
          console.log(this.tFilter);
        } else {
          this.invimaUtils.setDetail =false;
          this.invimaUtils.setError = true;
          this._isData = false;
          this.setStep('2');
          return true;
        }
      }, (error) => {
        console.error(error);
        this.invimaUtils.setDetail =false;
        window.scroll(0, 0);
        this.invimaUtils.setError = true;
        this._isData = false;
        this.setStep('2');
      }
      );
    } else {
      this.invimaUtils.getConsultaGeneralATC(this.invimaUtils.atcCode)
      .subscribe((data:ConsultaGeneralATCHeader) => {
          if (data != null){          
            console.log(data);            
            this._isData = true;
            this.setStep('4');
            for(var item of data.objLista) {
              const listElements = [];
              // Recorre configuración de header
              for (const config of header) {
                        const cellData = item[config.columnName];
                        const el: TableCellModel = {
                          content: cellData,
                          class: item.estado === 'Vencido' ? 'color-green' : 'color-govco'
                        };
  
                        if (config.columnName === 'numeroexpediente') {
                          el.type = 'link-event';
                          el.class = 'btn btn-low';
                          el.event = this.openModal.bind(this, el);
                        }
                        if (config.columnName === 'fechavencimiento') {
                          el.content = this.convertStringToDate(cellData, '-');
                        }
                        listElements.push(el);
                      }
              this.tFilter.Body.push(listElements);    
            }
            console.log(this.tFilter);
          }
        }, (error) => {
          console.error(error);
          window.scroll(0, 0);
          this.invimaUtils.setDetail = false;  
          this.invimaUtils.setError = true;
          this.setStep('2');
        }
      );
    }
  }


  private openModal(data: any) {
    this.router.navigate(["/invima/revision-informacion-consulta-productos/T11625/detalle"], 
    {state:
      {
        expediente: data.content,
        group: this.invimaUtils.groupConsultaRegistro
      }
    });
    console.log('OpenModal');
  };

  private convertStringToDate(str, character) {
    const fecha: Date = new Date();
    const arrDate = str.split(character);
    const day = Number(arrDate[2].split(' ')[0]);
    const month = Number(arrDate[1]);
    const year = Number(arrDate[0]);
    fecha.setMonth(month - 1);
    fecha.setFullYear(year);
    fecha.setDate(day);

    return fecha;
  }

  ngAfterViewInit() {
}

  open() {
    //this.router.navigate(["/invima/detalle"]);    
//    this.InvimaUtils.setNewDetail = true;
  }

  setStep(step: string) {
    const s = document.getElementsByTagName('govco-area-servicios');
    s[0].setAttribute('steptramites', step);
  }

}