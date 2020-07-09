import  {Solicitudsalidaobra} from './solicitudsalidaobra';

export interface ReturnModelObtenerSolicitudPorIntermediario
    {
 
        SolicitudSalidaObra: Solicitudsalidaobra;
        Solicitud:Solicitudsalidaobra;
        Success: boolean;
        Errors :Error;
    }