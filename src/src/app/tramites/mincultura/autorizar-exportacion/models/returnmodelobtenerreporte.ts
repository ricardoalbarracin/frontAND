export interface ReturnModelObtenerReporte 
    {

        Reporte : object;
        ListaReportes : Listareporte[];
        Success : boolean;
        Errors : Error;
    }

    export interface Listareporte
    {
        Sos_Id : number;
        Restricciones : number;
        Respuesta : string;
        Reportes : Reporte[];
    }

    export interface Reporte
    {
        NombreArchivo : string;
        Archivo : string;
    }