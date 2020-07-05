

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
        IdConceptoObra : number;
        SosId : number;
        FicId : number;
        IdEstadoObra : number;
        FechaEstado : string;
        IntSpeccionFisica : number;
        FechaIntSpeccion : object;
        IdConceptoTecnico : number;
        Observacion : string;
        Restricciones : number;
        FechaExpedicion : string;
        FechaValidez : string;
        Nota : string;
        NumeroSeguridad : string;
        FicConsecutivoObra : string;
        RevisadoExportacion : number;
        ObservacionExportacion : string;
    }
