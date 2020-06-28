export interface ReturnModelObtenerTiposTecnicas 
    {

        Paises : object;
        ZonasGeograficas : object;
        ZonaGeografica : object;
        TiposDocumentos : object;
        TiposEpocas : object;
        TiposTecnicas : Tipostecnica[];
        TiposPersonas : object;
        TiposMotivos : object;
        TiposRespuestas : object;
        TiposGenericos : object;
        Success : boolean;
        Errors : Error;
    }

    export interface Tipostecnica
    {
        TIT_ID : number;
        GRU_ID : number;
        TIT_NOMBRE : string;
    }