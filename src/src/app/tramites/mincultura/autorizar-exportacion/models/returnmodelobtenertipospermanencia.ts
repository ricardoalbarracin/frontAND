import  {Tiposgenerico} from './Tiposgenerico';

export interface ReturnModelObtenerTiposPermanencia 
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
