export interface ReturnModelObtenerTiposDocumentosidentidad 
    {

        Paises : object;
        ZonasGeograficas : object;
        ZonaGeografica : object;
        TiposDocumentos : Tiposdocumento[];
        TiposEpocas : object;
        TiposTecnicas : object;
        TiposPersonas : object;
        TiposMotivos : object;
        TiposRespuestas : object;
        TiposGenericos : object;
        Success : boolean;
        Errors : Error;
    }

    export interface Tiposdocumento
    {
        PatSolicitudSalidaObras : object[];
        PatFichaTecnicaBienes : object[];
        DocId : number;
        DocNombre : string;
        DocActivo : string;
        Codigo : string;
    }
