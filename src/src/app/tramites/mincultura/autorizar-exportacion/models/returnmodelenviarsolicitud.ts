import  {Solicitudsalidaobra} from './solicitudsalidaobra';
export interface ReturnModelEnviarSolicitud 
    {


        SolicitudSalidaObra : Solicitudsalidaobra;
        Solicitud : object;
        Success : boolean;
        Errors : Error[];
    }