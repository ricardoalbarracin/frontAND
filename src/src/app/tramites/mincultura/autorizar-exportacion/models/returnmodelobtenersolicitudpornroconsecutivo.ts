import  {Solicitudsalidaobra} from './solicitudsalidaobra';
export interface ReturnModelObtenerSolicitudPorNroConsecutivo
    {
        message:string;
        result:ReturnResult;
    }

    export interface ReturnResult{
      error:string;
      mensage: string;
      operacionExitosa:boolean;
      solicitud:string;
      solicitudSalidaObra: Solicitudsalidaobra;
      success: boolean;

    }
