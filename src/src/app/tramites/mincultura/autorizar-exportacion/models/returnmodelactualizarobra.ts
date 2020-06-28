import  {Fichatecnicabienes} from './fichatecnicabienes';

export interface ReturnModelActualizarObra 
    {
        FichaTecnicaBienes : Fichatecnicabienes;
        Success : boolean;
        Errors : Error;
    }
