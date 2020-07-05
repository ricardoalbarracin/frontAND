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
        PatSolicitudSalidaObras : object[];
        ZonId : number;
        ZonNombre : string;
        ZonPadreId : number;
        ZonPoblacion : number;
        X : string;
        ZonLatitud : Number;
        ZonLongitud : Number;
        EsCorrimiento : boolean;
    }
