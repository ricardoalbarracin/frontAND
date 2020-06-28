export interface ReturnModelObtenerMunicipio 
    {

        Paises : object;
        ZonasGeograficas : object;
        ZonaGeografica : Zonageografica;
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

    export interface Zonageografica
    {
        PAT_SOLICITUD_SALIDA_OBRAS : object[];
        ZON_ID : number;
        ZON_NOMBRE : string;
        ZON_PADRE_ID : number;
        ZON_POBLACION : number;
        x : string;
        ZON_LATITUD : Number;
        ZON_LONGITUD : Number;
        EsCorrimiento : boolean;
    }