import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { TestComponent } from './test/test.component';
import { SharedModule } from '@shared/shared.module';
import { ModalDetailComponent } from './modal-detail/modal-detail.component';
import { NgbModalModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TestComponent, ModalDetailComponent],
  imports: [
    CommonModule,
    TestRoutingModule,
    SharedModule,
    NgbModalModule,
    NgbModule,
    FormsModule
  ],
  entryComponents: [ModalDetailComponent]
})
export class TestModule { }
