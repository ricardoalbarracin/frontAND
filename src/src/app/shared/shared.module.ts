import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { BreadCrumbComponent } from './bread-crumb/components/bread-crumb/bread-crumb.component';
import { RouterModule } from '@angular/router';
import { WordLimitPipe } from './pipes/word-limit/word-limit.pipe';
import { ConfirmModalComponent } from './dialog-modal/components/confirm-modal/confirm-modal.component';
import { ConfirmModalService } from './dialog-modal/services/confirm-modal.service';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { TramiteDetailComponent } from './tramite-detail/components/tramite-detail/tramite-detail.component';
import { BtnVolverComponent } from './btn-volver/components/btn-volver/btn-volver.component';
import { NotificationsComponent } from './notifications/components/notifications/notifications.component';
import { InputValidatorDirective } from './directives/input-validator/input-validator.directive';
import { LoadingComponent } from './loading/components/loading/loading.component';
import { DropdownlistComponent } from './forms/components/dropdownlist/dropdownlist.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TablesComponent } from './forms/components/tables/tables.component';
import { NgbdSortableHeader } from './forms/directives/sortable.directive';
import { TableBasicComponent } from './forms/components/table-basic/table-basic.component';
import { TableCompleteComponent } from './forms/components/table-complete/table-complete.component';
import { TableSimpleComponent } from './forms/components/table-simple/table-simple.component';
import { TableDetailComponent } from './forms/components/table-detail/table-detail.component';
import { DropdownlistSimpleComponent } from './forms/components/dropdownlist-simple/dropdownlist-simple.component';
import { TableFilterComponent } from './forms/components/table-filter/table-filter.component';
import { DateMaskPipe } from './pipes/date-mask/date-mask.pipe';
import { DateRangeComponent } from './forms/components/date-range/date-range.component';
import { TramiteDetailService } from './tramite-detail/services/tramite-detail.service';
import { AccessibilityComponent } from './accessibility/accessibility.component';
import { NotificationActionComponent } from './notifications/components/notification-action/notification-action.component';
import { BackToTopComponent} from './back-to-top/back-to-top.component';
import { PasswordComponent } from './forms/components/password/password.component';
import { SubirarchivoComponent } from './subirarchivo/subirarchivo.component';

@NgModule({
  declarations: [
      BreadCrumbComponent,
      WordLimitPipe,
      ConfirmModalComponent,
      TramiteDetailComponent,
      BtnVolverComponent,
      NotificationsComponent,
      InputValidatorDirective,
      LoadingComponent,
      DropdownlistComponent,
      TablesComponent,
      NgbdSortableHeader,
      TableBasicComponent,
      TableCompleteComponent,
      TableSimpleComponent,
      TableDetailComponent,
      TableFilterComponent,
      DropdownlistSimpleComponent,
      DateMaskPipe,
      DateRangeComponent,
      AccessibilityComponent,
      NotificationActionComponent,
      BackToTopComponent,
      PasswordComponent,
      SubirarchivoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModalModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    BreadCrumbComponent,
    TramiteDetailComponent,
    BtnVolverComponent,
    NotificationsComponent,
    InputValidatorDirective,
    LoadingComponent,
    DropdownlistComponent,
    TablesComponent,
    TableBasicComponent,
    TableSimpleComponent,
    TableCompleteComponent,
    NgbdSortableHeader,
    DropdownlistSimpleComponent,
    TableFilterComponent,
    DateMaskPipe,
    AccessibilityComponent,
    NotificationActionComponent,
    BackToTopComponent,
    PasswordComponent
  ],
  providers: [ConfirmModalService, DecimalPipe, TramiteDetailService],
  entryComponents: [ConfirmModalComponent, DateRangeComponent,SubirarchivoComponent]
})
export class SharedModule { }
