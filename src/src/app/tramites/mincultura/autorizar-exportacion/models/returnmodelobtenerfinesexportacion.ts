import  {Tiposmotivo} from './tiposmotivo';

export interface ReturnModelObtenerFintesExportacion 
    {

        Paises : object;
        ZonasGeograficas : object;
        ZonaGeografica : object;
        TiposDocumentos : object;
        TiposEpocas : object;
        TiposTecnicas : object;
        TiposPersonas : object;
        TiposMotivos : Tiposmotivo[];
        TiposRespuestas : number;
        TiposGenericos : number;
        Success : boolean;
        Errors : Error;
    }
