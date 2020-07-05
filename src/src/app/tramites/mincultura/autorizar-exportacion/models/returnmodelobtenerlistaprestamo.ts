

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
        IdPrestamo : number;
        SosId : number;
        RegistroMintCultura : string;
        CodigoObjetoEntidad : string;
        Titulo : string;
        Autor : string;
        Firmado : object;
        Atributo : string;
        Epoca : string;
        Fechado : number;
        Tecnica : number;
        Alto : string;
        Ancho : string;
        Largo : string;
        Profundidad : string;
        Espesor : string;
        DiametroMay : string;
        DiametroMen : string;
        Peso : string;
        DescripcionObjeto : string;
        ElementoRelacionado : string;
        CodigoEntidad : string;
        Dimsension : string;
        TecnicaRelacion : number;
        DescripcionRelacion : object;
        Exposicion : string;
        EntidadRespCol : string;
        EntidadRespExt : string;
        PaisExp : object;
        CiudadExp : string;
        LugarExp : string;
        Justificacion : string;
        Avaluador : string;
        Avaluo : string;
        Fecha : string;
        Aseguradora : string;
        Poliza : string;
        Valor : string;
        EmpresaEmpaque : string;
        FechaIntIcio : string;
        FechaFnumber : string;
        EntregadoPor : string;
        Firma : object;
        FechaExposicion : object;
        ObservacionesExp : string;
        REintEgroEntregado : string;
        REintEgroFirmaEnt : string;
        REintEgroRecibido : string;
        REintEgroFirmaRec : string;
        ObservacionesREintEgro : string;
        Temperatura : string;
        Luz : string;
        Hr : string;
        RevisadoPor : string;
        Bueno : object;
        Regular : object;
        Malo : object;
        Restaurado : number;
        FechaRestauracion : string;
        Responsable : string;
        Recomendaciones : string;
        FechaSalida : string;
        FechaLlegada : string;
        FicId : number;
        Curador : object;
    }
