
import  {Solicitudsalidaobra} from './solicitudsalidaobra';

export interface ReturnModelActualizarSolicitud 
    {


        SolicitudSalidaObra : Solicitudsalidaobra;
        Solicitud : object;
        Success : boolean;
        Errors : Error;
    }
