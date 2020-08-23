import  {Anexo} from './Anexo';
export interface RequestModelActualizarSolicitud
    {
        SosId : string;
        Ciudad : string;
        DocIdSolicitante : number;
        ZopId : number;
        ZonId : string;
        SosNombreSolicitante : string;
        SosNroDocumentoSolicitante : string;
        SosNroFoliosAnexos : number;
        SosFechaParaDarConcepto : string;
        SosCantidad : number;
        TmsId : number;
        SosLugarExpedicion : string;
        SosDireccionSolicitante : string;
        SosTelefonoSolicitante : string;
        SosCorreoSolicitante : string;
        SosNombreintermediario : string;
        DocIdintermediario : number;
        SosNroDocumentointermediario : string;
        SosDireccionintermediario : string;
        SosTelefonointermediario : string;
        SosSintointermediario : string;
        SosSintoAnexos : string;
        SosSintoProrroga : string;
        ZopNombre : string;
        SosTipoPersonaId : number;
        SosZonPadreId : number;
        SosZonId : string;
        IntZopId : number;
        IntCiudad : string;
        IntUbicacionZopId : number;
        IntUbicacionCiudad : string;
        IntUbicacionEmail : string;
        ProrrogaFechaRegreso : object;
        ProrrogaMotivo : string;
        DestinoZopId : number;
        DestinoCiudad : string;
        DestinoDireccion : string;
        DestinoFintExportacion : string;
        DestinoEntidad : string;
        DestinoTelefono : string;
        DestinoTiempoPermanencia : number;
        DestinoTipoTiempoPermanencia : number;
        ReitegroObservaciones : string;
        SosNombreRepresentante : string;
        AceptaHabeasdata : boolean;
        Requiereintermediario : boolean;
        AnexoSolicitante : Anexo[];
    }
