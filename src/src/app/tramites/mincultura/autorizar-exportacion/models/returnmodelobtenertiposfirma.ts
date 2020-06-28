import  {Tiposgenerico} from './tiposgenerico';
export interface ReturnModelObtenerTiposFirma 
    {

        Paises : object;
        ZonasGeograficas : object;
        ZonaGeografica : object;
        TiposDocumentos : object;
        TiposEpocas : object;
        TiposTecnicas : object;
        TiposPersonas : object;
        TiposMotivos : object;
        TiposRespuestas : object;
        TiposGenericos : Tiposgenerico[];
        Success : boolean;
        Errors : Error;
    }

    

}