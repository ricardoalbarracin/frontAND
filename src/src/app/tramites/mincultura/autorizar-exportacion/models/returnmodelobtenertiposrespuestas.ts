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
        TIR_ID : number;
        TIR_NOMBRE : string;
        TIR_CONCEPTO : string;
        TIR_NORMA : string;
    }