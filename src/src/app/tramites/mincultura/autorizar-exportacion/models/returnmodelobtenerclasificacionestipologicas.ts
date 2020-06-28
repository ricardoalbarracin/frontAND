export interface ReturnModelObtenerClasificacionesTipologicas 
    {


        ClasificacionTipologica : Clasificaciontipologica[];
        ClasificacionTipologicaGrupo : object;
        ClasificacionTipologicaGrupoId : object;
        Success : boolean;
        Errors : Error;
    }

    export interface Clasificaciontipologica
    {
        CLT_ID : number;
        CTL_CODIGO : string;
        CLT_NOMBRE : string;
        CLT_PADRE_ID : number;
        CLT_NIVEL : number;
        CLT_NOMBRE_NIVEL : string;
        PAG_ID : number;
        CLT_REGISTRO_HIJOS : string;
    }