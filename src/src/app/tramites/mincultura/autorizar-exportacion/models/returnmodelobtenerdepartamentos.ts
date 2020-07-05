import  {Zonasgeografica} from './ZonasGeografica';
export interface ReturnModelObtenerDepartamentos 
    {


        Paises : object;
        ZonasGeograficas : Zonasgeografica[];
        ZonaGeografica : object;
        TiposDocumentos : object;
        TiposEpocas : object;
        TiposTecnicas : object;
        TiposPersonas : object;
        TiposMotivos : object;
        TiposRespuestas : object;
        TiposGenericos : object;
        Success : boolean;
        Errors : Error;
    }