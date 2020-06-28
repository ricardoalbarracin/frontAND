

export interface ReturnModelObtenerListaConceptosObras 
    {


        Concepto : object;
        Conceptos : object;
        ConceptosObras : Conceptosobra[];
        Prestamos : object;
        Deterioros : object;
        Success : boolean;
        Errors : Error;
    }

    export interface Conceptosobra
    {
        ID_CONCEPTO_OBRA : number;
        SOS_ID : number;
        FIC_ID : number;
        ID_ESTADO_OBRA : number;
        FECHA_ESTADO : string;
        intSPECCION_FISICA : number;
        FECHA_intSPECCION : object;
        ID_CONCEPTO_TECNICO : number;
        OBSERVACION : string;
        RESTRICCIONES : number;
        FECHA_EXPEDICION : string;
        FECHA_VALIDEZ : string;
        NOTA : string;
        NUMERO_SEGURIDAD : string;
        FIC_CONSECUTIVO_OBRA : string;
        REVISADO_EXPORTACION : number;
        OBSERVACION_EXPORTACION : string;
    }