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
        CltId : number;
        CtlCodigo : string;
        CltNombre : string;
        CltPadreId : number;
        CltNivel : number;
        CltNombreNivel : string;
        PagId : number;
        CltRegistroHijos : string;
    }
