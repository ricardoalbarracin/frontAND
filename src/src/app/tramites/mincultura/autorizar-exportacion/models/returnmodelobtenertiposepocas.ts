export interface ReturnModelObtenerTiposEpocas 
    {

        Paises : object;
        ZonasGeograficas : object;
        ZonaGeografica : object;
        TiposDocumentos : object;
        TiposEpocas : Tiposepoca[];
        TiposTecnicas : object;
        TiposPersonas : object;
        TiposMotivos : object;
        TiposRespuestas : object;
        TiposGenericos : object;
        Success : boolean;
        Errors : Error;
    }

    export interface Tiposepoca
    {
        TEP_ID : number;
        TEP_NOMBRE : string;
    }