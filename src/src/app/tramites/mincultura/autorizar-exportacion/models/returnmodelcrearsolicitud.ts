import  {Solicitudsalidaobra} from './solicitudsalidaobra';
export interface ReturnModelCrearSolicitud 
    {

        SolicitudSalidaObra : Solicitudsalidaobra;
        Solicitud : object;
        Success : boolean;
        Errors : Error;
    }
