
export interface ConsultorioJuridico {
    id: number;

    ConsultorioNombre: string;

    ConsultorioDireccion: string;

    ConsultorioTelefono: number;

    ConsultorioEmail: string;

    ConsultorioLatidud: number;

    ConsultorioLongitud: number;

    Tema?: string;

    horario?: HorarioConsultorio
}

export interface HorarioConsultorio {
    id?: number;

    DisponibilidadHora : string;
}

export interface QueryParams{
    idCiudad?: number;

    ciudad: string;
    
    fecha: Date;

    fechaString: string;

    latitud: string;

    longitud: string;
}