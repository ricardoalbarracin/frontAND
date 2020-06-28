export interface Fichatecnicabienes
    {
        FIC_ID : number;
        TIB_ID : number;
        intB_ID : number;
        RES_NRO_CONCEPTO : object;
        SOS_ID : number;
        DOC_ID : number;
        FIC_TITULO : object;
        FIC_AUTOR : object;
        FIC_FECHA_ELABORACION_OBRA : object;
        FIC_TECNICA : object;
        FIC_DIMENSIONES : object;
        FIC_PROPIETARIO : object;
        FIC_NRO_DOCUMENTO_IDENTIDAD : object;
        FIC_OBSERVACIONES : string;
        FIC_FOTO : object;
        TOB_ID : number;
        FIC_CONSECUTIVO_OBRA : string;
        FIC_CONSECUTIVO_SEGURIDAD : object;
        CLT_ID : number;
        CANTIDAD : object;
        FIC_ALTO : object;
        FIC_LARGO : object;
        FIC_ANCHO : object;
        FIC_PROFUNDIDAD : object;
        FIC_ESPESOR : object;
        TEP_ID : number;
        ID_FIRMADO : object;
        CTL_PADRE_ID : number;
        TIT_ID : number;
        CTL_HIJO_ID : number;
        BAS_TIPOS_DOCUMENTOS_IDENTIDAD : object;
        PAT_SIPA_CONCEPTO_OBRAS : object[];
        PAT_SOLICITUD_SALIDA_OBRAS : object;
        PAT_ANEXOS : object[];
    }