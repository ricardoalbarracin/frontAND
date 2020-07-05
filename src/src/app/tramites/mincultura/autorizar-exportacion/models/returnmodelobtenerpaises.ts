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
        PatSolicitudSalidaObras : object[];
        ZopId : number;
        ZopNombre : string;
        ZopCodigoIntErnet : string;
    }
