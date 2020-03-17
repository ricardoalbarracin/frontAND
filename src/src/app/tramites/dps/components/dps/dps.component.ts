import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DpsUtilsService } from '../../services/dps-utils.service';

@Component({
  selector: 'app-dps',
  templateUrl: './dps.component.html',
  styleUrls: ['./dps.component.scss']
})
export class DpsComponent implements OnInit {

  public form: FormGroup;
  public messages: {};
  public invalidForm: boolean;
  public formDps: FormGroup = new FormGroup({
    firstName: new FormControl()
 });

 constructor(private  dpsUtilsService: DpsUtilsService){ }
 
  ngOnInit() {
   }
}
