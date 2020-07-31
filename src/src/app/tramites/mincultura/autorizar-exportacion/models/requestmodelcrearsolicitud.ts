import  {Anexo} from './Anexo';
export interface RequestModelCrearSolicitud
    {
        Ciudad : string;
        DocIdSolicitante : number;
        ZopId : number;
        ZonId : string;
        SosNombreSolicitante : string;
        SosNroDocumentoSolicitante : string;
        SosCantidad : number;
        SosTipoPersonaId : number;
        SosZonPadreId : number;
        SosZonId : string;
        SosLugarExpedicion : string;
        SosDireccionSolicitante : string;
        SosTelefonoSolicitante : string;
        SosCorreoSolicitante : string;
        Requiereintermediario : boolean;
        SosNombreintermediario : string;
        DocIdintermediario : number;
        SosNroDocumentointermediario : string;
        SosDireccionintermediario : string;
        SosTelefonointermediario : string;
        ZopNombre : string;
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
        DestinoEntidad : string;
        DestinoTelefono : string;
        DestinoTiempoPermanencia : number;
        DestinoTipoTiempoPermanencia : number;
        TmsId : number;
        ReitegroObservaciones : string;
        SosNombreRepresentante : string;
        AceptaHabeasdata : boolean;
        AnexoSolicitante : Anexo[];
        Anexointermediario : Anexo[];
    }
