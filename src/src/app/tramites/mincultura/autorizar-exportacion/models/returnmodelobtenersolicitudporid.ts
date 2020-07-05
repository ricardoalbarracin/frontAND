

export interface ReturnModelObtenerSolicitudPorId 
    {

        SolicitudSalidaObra : object;
        Solicitud : Solicitud;
        Success : boolean;
        Errors : Error;
    }

    export interface Solicitud
    {
        SosId : number;
        Ciudad : string;
        DocIdSolicitante : number;
        ZopId : number;
        ZonId : string;
        SosNombreSolicitante : string;
        SosNroDocumentoSolicitante : string;
        SosNroFoliosAnexos : number;
        SosFechaParaDarConcepto : string;
        SosCantidad : number;
        Estado : string;
        SosConsecutivo : string;
        SosFechaRadicacion : string;
        TmsId : number;
        SosLugarExpedicion : string;
        SosDireccionSolicitante : string;
        SosTelefonoSolicitante : string;
        SosCorreoSolicitante : string;
        SosNombreIntErmediario : string;
        DocIdIntErmediario : number;
        SosNroDocumentoIntErmediario : string;
        SosDireccionIntErmediario : string;
        SosTelefonoIntErmediario : string;
        SosSintOIntErmediario : string;
        SosSintOAnexos : string;
        SosSintOProrroga : string;
        ZopNombre : string;
        SosConsecutivoIntDice : string;
        SosTipoPersonaId : string;
        SosZonPadreId : number;
        SosZonId : string;
        IntZopId : number;
        IntCiudad : string;
        IntUbicacionZopId : object;
        IntUbicacionCiudad : string;
        IntUbicacionEmail : string;
        ProrrogaFechaRegreso : object;
        ProrrogaMotivo : string;
        DesTintOZopId : number;
        DesTintOCiudad : string;
        DesTintODireccion : string;
        DesTintOFintExportacion : string;
        DesTintOEntidad : string;
        DesTintOTelefono : string;
        DesTintOTiempoPermanencia : number;
        DesTintOTipoTiempoPermanencia : number;
        ReitegroObservaciones : string;
        UsuId : number;
        Aceptahabeasdata : boolean;
        RequierEintErmediario : boolean;
    }
