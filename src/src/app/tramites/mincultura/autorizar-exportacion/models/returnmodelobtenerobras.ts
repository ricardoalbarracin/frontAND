export interface ReturnModelObtenerObras 
    {

    
        obras : Obra[];
        Success : boolean;
        Errors : Error;
    }

    export interface Obra
    {
        FIC_ID : number;
        TIB_ID : number;
        intB_ID : object;
        RES_NRO_CONCEPTO : object;
        SOS_ID : number;
        DOC_ID : number;
        FIC_TITULO : string;
        FIC_AUTOR : string;
        FIC_FECHA_ELABORACION_OBRA : string;
        FIC_TECNICA : string;
        FIC_DIMENSIONES : string;
        FIC_PROPIETARIO : string;
        FIC_NRO_DOCUMENTO_IDENTIDAD : string;
        FIC_OBSERVACIONES : string;
        FIC_FOTO : string;
        TOB_ID : number;
        FIC_CONSECUTIVO_OBRA : string;
        FIC_CONSECUTIVO_SEGURIDAD : string;
        CLT_ID : number;
        FIC_ALTO : string;
        FIC_LARGO : string;
        FIC_ANCHO : string;
        FIC_PROFUNDIDAD : string;
        FIC_ESPESOR : string;
        TEP_ID : number;
        ID_FIRMADO : number;
        CTL_PADRE_ID : number;
        TIT_ID : number;
        CANTIDAD : number;
        CTL_HIJO_ID : number;
    }