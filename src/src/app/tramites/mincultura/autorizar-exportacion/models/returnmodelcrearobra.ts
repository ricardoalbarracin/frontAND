import  {Fichatecnicabienes} from './fichatecnicabienes';
export interface ReturnModelCrearObra 
    {
        FichaTecnicaBienes : Fichatecnicabienes;
        Success : boolean;
        Errors : Error;
    }