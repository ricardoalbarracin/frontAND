

export interface ReturnModelObtenerSolicitudPorId 
    {

        SolicitudSalidaObra : object;
        Solicitud : Solicitud;
        Success : boolean;
        Errors : Error;
    }

    export interface Solicitud
    {
        SOS_ID : number;
        CIUDAD : string;
        DOC_ID_SOLICITANTE : number;
        ZOP_ID : number;
        ZON_ID : string;
        SOS_NOMBRE_SOLICITANTE : string;
        SOS_NRO_DOCUMENTO_SOLICITANTE : string;
        SOS_NRO_FOLIOS_ANEXOS : number;
        SOS_FECHA_PARA_DAR_CONCEPTO : string;
        SOS_CANTIDAD : number;
        ESTADO : string;
        SOS_CONSECUTIVO : string;
        SOS_FECHA_RADICACION : string;
        TMS_ID : number;
        SOS_LUGAR_EXPEDICION : string;
        SOS_DIRECCION_SOLICITANTE : string;
        SOS_TELEFONO_SOLICITANTE : string;
        SOS_CORREO_SOLICITANTE : string;
        SOS_NOMBRE_intERMEDIARIO : string;
        DOC_ID_intERMEDIARIO : number;
        SOS_NRO_DOCUMENTO_intERMEDIARIO : string;
        SOS_DIRECCION_intERMEDIARIO : string;
        SOS_TELEFONO_intERMEDIARIO : string;
        SOS_SintO_intERMEDIARIO : string;
        SOS_SintO_ANEXOS : string;
        SOS_SintO_PRORROGA : string;
        ZOP_NOMBRE : string;
        SOS_CONSECUTIVO_intDICE : string;
        SOS_TIPO_PERSONA_ID : string;
        SOS_ZON_PADRE_ID : number;
        SOS_ZON_ID : string;
        int_ZOP_ID : number;
        int_CIUDAD : string;
        int_UBICACION_ZOP_ID : object;
        int_UBICACION_CIUDAD : string;
        int_UBICACION_EMAIL : string;
        PRORROGA_FECHA_REGRESO : object;
        PRORROGA_MOTIVO : string;
        DESTintO_ZOP_ID : number;
        DESTintO_CIUDAD : string;
        DESTintO_DIRECCION : string;
        DESTintO_Fint_EXPORTACION : string;
        DESTintO_ENTIDAD : string;
        DESTintO_TELEFONO : string;
        DESTintO_TIEMPO_PERMANENCIA : number;
        DESTintO_TIPO_TIEMPO_PERMANENCIA : number;
        REITEGRO_OBSERVACIONES : string;
        USU_ID : number;
        ACEPTAHABEASDATA : boolean;
        REQUIEREintERMEDIARIO : boolean;
    }