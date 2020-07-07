import { SelectListItemModel } from '@shared/forms/models/select-list-item.model';
export interface ReturnModelListasCrearSolicitud
    {
        message : string;
        success : boolean;
        result : ListasCrearSolicitud
    }

    export interface ListasCrearSolicitud
    {
        tiposDocumento : SelectListItemModel[];
        departamentos : SelectListItemModel[];
        paises : SelectListItemModel[];
       
    }



