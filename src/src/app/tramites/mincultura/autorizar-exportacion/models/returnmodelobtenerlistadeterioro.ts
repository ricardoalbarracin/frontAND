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
        IdDeterioro : number;
        Descripcion : string;
        NoDeterioro : number;
        SiDeterioro : number;
        Letra : string;
        Localizacion : string;
        FicId : number;
    }
