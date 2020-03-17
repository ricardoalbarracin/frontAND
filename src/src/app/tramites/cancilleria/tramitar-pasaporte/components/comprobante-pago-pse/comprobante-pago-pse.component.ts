import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TramitarPasaporteService } from '../../services/tramitar-pasaporte.service';

@Component({
  selector: 'app-comprobante-pago-pse',
  templateUrl: './comprobante-pago-pse.component.html',
  styleUrls: ['./comprobante-pago-pse.component.scss']
})

export class ComprobantePagoPseComponent implements OnInit {
  pdf: ArrayBuffer;
  solictudId:string;

  constructor(private tramiteService: TramitarPasaporteService, private router: ActivatedRoute) {
    this.solictudId = this.router.snapshot.paramMap.get('ticketID');
  }

  ngOnInit() {
    this.getDataComprobante(this.solictudId);    
  }

  getDataComprobante (solictudId:string): void {
    this.tramiteService.getDataComprobante(solictudId).subscribe((data: any[]) => {
      if (data != undefined) {
        this.pdf = this.base64ToArrayBuffer(data);
      }
    }, (error) => {
      console.error(error);
    });
  }

  base64ToArrayBuffer(base64: any) {
    let binary_string = window.atob(base64);
    let len = binary_string.length;
    let bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }

}

