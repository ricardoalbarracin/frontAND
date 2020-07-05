export interface ReturnModelObtenerTiposRespuestas 
    {

        Paises : object;
        ZonasGeograficas : object;
        ZonaGeografica : object;
        TiposDocumentos : object;
        TiposEpocas : object;
        TiposTecnicas : object;
        TiposPersonas : object;
        TiposMotivos : object;
        TiposRespuestas : Tiposrespuesta[];
        TiposGenericos : object;
        Success : boolean;
        Errors : Error;
    }

    export interface Tiposrespuesta
    {
        TirId : number;
        TirNombre : string;
        TirConcepto : string;
        TirNorma : string;
    }
