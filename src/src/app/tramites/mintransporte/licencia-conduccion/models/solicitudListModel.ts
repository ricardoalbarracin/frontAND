import { SelectListItemModel } from '@shared/forms/models/select-list-item.model';

export interface SolicitudListModel {
    entidades: SelectListItemModel[];

    paises: SelectListItemModel[];

    tiposDocumento: SelectListItemModel[];
}