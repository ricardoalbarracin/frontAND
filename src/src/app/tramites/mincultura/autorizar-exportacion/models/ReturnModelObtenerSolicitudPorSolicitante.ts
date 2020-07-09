import  {Solicitudsalidaobra} from './solicitudsalidaobra';
export interface  ReturnModelObtenerSolicitudPorSolicitante 
    {

        SolicitudSalidaObras:Solicitudsalidaobra;
        SolicitudSolicitantesSalidaObras :Solicitudsalidaobra[];
        SolicitudSolicitanteSalidaObras:object;
        Success:boolean;
        Errors: Error;
    }


