import  {Solicitudsalidaobra} from './solicitudsalidaobra';
export interface ReturnModelCrearSolicitud 
    {
        solicitudSalidaObra : Solicitudsalidaobra;
        solicitud : object;
        success : boolean;
        errors : Error;
        mensaje: string;
        operacionExitosa: boolean;
    }
