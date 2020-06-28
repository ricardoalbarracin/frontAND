export interface ReturnModelObtenerListaDeterioro 
    {


        Concepto : object;
        Conceptos : object;
        ConceptosObras : object;
        Prestamos : object;
        Deterioros : Deterioro[];
        Success : boolean;
        Errors : Error;
    }

    export interface Deterioro
    {
        ID_DETERIORO : number;
        DESCRIPCION : string;
        NO_DETERIORO : number;
        SI_DETERIORO : number;
        LETRA : string;
        LOCALIZACION : string;
        FIC_ID : number;
    }