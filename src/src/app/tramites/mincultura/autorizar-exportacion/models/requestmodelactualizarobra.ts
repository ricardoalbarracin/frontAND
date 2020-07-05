import  {Anexo} from './Anexo';

export interface RequestModelActualizarObra
    {
        FicId : number;
        DocId : string;
        FichaTitulo : string;
        FichaAutor : string;
        FechaElaboracionObra : string;
        FichaTecnica : string;
        FichaPropietario : string;
        FichaNroDocumentoIdentidad : string;
        FichaObservaciones : string;
        FichaFoto : object;
        FichaAlto : string;
        FichaLargo : string;
        FichaAncho : string;
        FichaProfundidad : string;
        FichaEspesor : string;
        TepId : number;
        IdFirmado : number;
        CtlPadreId : number;
        CtlHijoId : number;
        CtlId : number;
        Cantidad : number;
        Anexos : Anexo[];
    }
