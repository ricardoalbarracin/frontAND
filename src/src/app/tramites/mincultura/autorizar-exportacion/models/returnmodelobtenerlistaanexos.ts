import  {Anexo} from './Anexo';

export interface ReturnModelObtenerListaAnexos 
    {

        ListaAnexos : Anexo[];
        Anexo : object;
        PatAnexo : object;
        ListPatAnexos : object;
        AnexosSolicitud : object;
        Success : boolean;
        Errors : Error;
    }