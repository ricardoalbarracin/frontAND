

export interface ReturnModelObtenerListaPrestamo 
    {


        Concepto : object;
        Conceptos : object;
        ConceptosObras : object;
        Prestamos : Prestamo[];
        Deterioros : object;
        Success : boolean;
        Errors : Error;
    }

    export interface Prestamo
    {
        ID_PRESTAMO : number;
        SOS_ID : number;
        REGISTRO_MintCULTURA : string;
        CODIGO_OBJETO_ENTIDAD : string;
        TITULO : string;
        AUTOR : string;
        FIRMADO : object;
        ATRIBUTO : string;
        EPOCA : string;
        FECHADO : number;
        TECNICA : number;
        ALTO : string;
        ANCHO : string;
        LARGO : string;
        PROFUNDIDAD : string;
        ESPESOR : string;
        DIAMETRO_MAY : string;
        DIAMETRO_MEN : string;
        PESO : string;
        DESCRIPCION_OBJETO : string;
        ELEMENTO_RELACIONADO : string;
        CODIGO_ENTIDAD : string;
        DIMSENSION : string;
        TECNICA_RELACION : number;
        DESCRIPCION_RELACION : object;
        EXPOSICION : string;
        ENTIDAD_RESP_COL : string;
        ENTIDAD_RESP_EXT : string;
        PAIS_EXP : object;
        CIUDAD_EXP : string;
        LUGAR_EXP : string;
        JUSTIFICACION : string;
        AVALUADOR : string;
        AVALUO : string;
        FECHA : string;
        ASEGURADORA : string;
        POLIZA : string;
        VALOR : string;
        EMPRESA_EMPAQUE : string;
        FECHA_intICIO : string;
        FECHA_Fnumber : string;
        ENTREGADO_POR : string;
        FIRMA : object;
        FECHA_EXPOSICION : object;
        OBSERVACIONES_EXP : string;
        REintEGRO_ENTREGADO : string;
        REintEGRO_FIRMA_ENT : string;
        REintEGRO_RECIBIDO : string;
        REintEGRO_FIRMA_REC : string;
        OBSERVACIONES_REintEGRO : string;
        TEMPERATURA : string;
        LUZ : string;
        HR : string;
        REVISADO_POR : string;
        BUENO : object;
        REGULAR : object;
        MALO : object;
        RESTAURADO : number;
        FECHA_RESTAURACION : string;
        RESPONSABLE : string;
        RECOMENDACIONES : string;
        FECHA_SALIDA : string;
        FECHA_LLEGADA : string;
        FIC_ID : number;
        CURADOR : object;
    }