import  {Zonasgeografica} from './zonasgeografica';
export interface ReturnModelObtenerMunicipios 
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
