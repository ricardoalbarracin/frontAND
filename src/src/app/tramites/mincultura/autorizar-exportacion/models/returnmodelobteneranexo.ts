import  {Anexo} from './Anexo';

export interface ReturnModelObtenerAnexo 
    {


        ListaAnexos : object;
        Anexo : Anexo;
        PatAnexo : object;
        ListPatAnexos : object;
        AnexosSolicitud : object;
        Success : boolean;
        Errors : Error[];
    }
