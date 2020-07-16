
import  {Solicitudsalidaobra} from './solicitudsalidaobra';
export interface ReturnModelObtenerSolicitudes
{
    message:string;
    result:ReturnResultSol;
}

export interface ReturnResultSol
    {
        solicitudSalidaObras : Solicitudsalidaobra[];
        SolicitudSolicitantesSalidaObras : object;
        SolicitudSolicitanteSalidaObras : object;
        Success : boolean;
        Errors : Error;
    }

