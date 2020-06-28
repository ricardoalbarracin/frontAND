
import  {Solicitudsalidaobra} from './Solicitudsalidaobra';
export interface ReturnModelObtenerSolicitudPorNroConsecutivo 
    {

        
        SolicitudSalidaObra : Solicitudsalidaobra;
        Solicitud : object;
        Success : boolean;
        Errors : Error;
    }