export interface ReturnModelObtenerPaises 
    {

    
        Paises : Pais[];
        ZonasGeograficas : object;
        ZonaGeografica : object;
        TiposDocumentos : object;
        TiposEpocas : object;
        TiposTecnicas : object;
        TiposPersonas : object;
        TiposMotivos : object;
        TiposRespuestas : object;
        TiposGenericos : object;
        Success : boolean;
        Errors : Error;
    }

    export interface Pais
    {
        PAT_SOLICITUD_SALIDA_OBRAS : object[];
        ZOP_ID : number;
        ZOP_NOMBRE : string;
        ZOP_CODIGO_intERNET : string;
    }