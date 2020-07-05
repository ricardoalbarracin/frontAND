import  {Tiposmotivo} from './Tiposmotivo';

export interface ReturnModelObtenerFinesExportacion 
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
