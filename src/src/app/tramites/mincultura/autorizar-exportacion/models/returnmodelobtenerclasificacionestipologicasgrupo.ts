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
        CLT_ID : number;
        CLT_NOMBRE : string;
    }