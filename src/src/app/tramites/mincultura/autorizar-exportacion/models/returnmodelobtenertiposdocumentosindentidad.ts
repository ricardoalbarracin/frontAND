export interface ReturnModelObtenerTiposDocumentosintdentidad 
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
        PAT_SOLICITUD_SALIDA_OBRAS : object[];
        PAT_FICHA_TECNICA_BIENES : object[];
        DOC_ID : number;
        DOC_NOMBRE : string;
        DOC_ACTIVO : string;
        CODIGO : string;
    }