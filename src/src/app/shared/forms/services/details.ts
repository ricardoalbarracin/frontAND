export interface Detail {
    id: number;
    name: string;
    linkName?: string;
    code: string;
    state: string;
    town: string;
    address: string;
    telephone: string;
}

export interface CITA {
    dateCita: string;
    hourCita: string;
    consultorio: string;
    tema: string;
    cancel?: string;
}