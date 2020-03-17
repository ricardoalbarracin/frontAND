export interface RegisterModel {
    identificacion: string;
    email: string;
    planilla: number;
    codigoOperador: number;
    anoPeriodo: number;
    mesPeriodo: number;
    Contrasena: string;
    ContrasenaConfirmacion: string;
    preguntaRecordacion: string;
    respuesta: string;
    autorizacionDatos: boolean;
    recaptcha: string;
}
