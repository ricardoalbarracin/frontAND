
import  {Solicitudsalidaobra} from './solicitudsalidaobra';

export interface ReturnModelObtenerSolicitudes 
    {

        SolicitudSalidaObras : Solicitudsalidaobra[];
        SolicitudSolicitantesSalidaObras : object;
        SolicitudSolicitanteSalidaObras : object;
        Success : boolean;
        Errors : Error;
    }
