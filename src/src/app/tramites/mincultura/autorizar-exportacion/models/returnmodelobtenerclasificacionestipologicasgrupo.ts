export interface ReturnModelObtenerClasificacionesTipologicasGrupo 
    {


        ClasificacionTipologica : object;
        ClasificacionTipologicaGrupo : Clasificaciontipologicagrupo[];
        ClasificacionTipologicaGrupoId : object;
        Success : boolean;
        Errors : Error;
    }

    export interface Clasificaciontipologicagrupo
    {
        CltId : number;
        CltNombre : string;
    }
