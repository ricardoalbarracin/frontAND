import  {Fichatecnicabienes} from './fichatecnicabienes';
export interface ReturnModelEliminarObra 
    {

    
        FichaTecnicaBienes : Fichatecnicabienes;
        Success : boolean;
        Errors : Error;
    }