export interface ReturnModelObtenerObras 
    {

    
        Obras : Obra[];
        Success : boolean;
        Errors : Error;
    }

    export interface Obra
    {
        FicId : number;
        TibId : number;
        IntBId : object;
        ResNroConcepto : object;
        SosId : number;
        DocId : number;
        FicTitulo : string;
        FicAutor : string;
        FicFechaElaboracionObra : string;
        FicTecnica : string;
        FicDimensiones : string;
        FicPropietario : string;
        FicNroDocumentoIdentidad : string;
        FicObservaciones : string;
        FicFoto : string;
        TobId : number;
        FicConsecutivoObra : string;
        FicConsecutivoSeguridad : string;
        CltId : number;
        FicAlto : string;
        FicLargo : string;
        FicAncho : string;
        FicProfundidad : string;
        FicEspesor : string;
        TepId : number;
        IdFirmado : number;
        CtlPadreId : number;
        TitId : number;
        Cantidad : number;
        CtlHijoId : number;
    }
