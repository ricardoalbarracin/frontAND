export interface requestUsuario {
    login: string;
    password: string;
    sistema: string;
}

export interface requestRegistrarUsuario {
    id: string;
    login: string;
    password: string;
    sistema: string;
    codigoRol: string;
}

export interface responseRegistrarUsuario {
    codigo: string;
    mensaje: string;
}

export interface requestUsuarioxID {
    id: string;
}

export interface requestUsuarioxDocumento {
    tipoDocumento: string;
    numeroDocumento: string;
}

export interface responseService {
    codigo: string;
    mensaje: string;
    persona: Persona;
}

export interface Persona {
    tipoPersona: string;
    natural: Natural;
    direcciones?: (DireccionesEntity)[] | null;
    id?: number;
    emails?: (EmailsEntity)[] | null;
    tipoDocumento: string;
    numeroDocumento: number;
    empresa?: Empresa;
}
export interface Natural {
    primerNombre: string;
    segundoNombre: string;
    primerApellido: string;
    segundoApellido: string;
    escolaridad?: null;
    genero?: null;
    grupoEtnico?: null;
    condicionDiscapacidad?: null;
    atencionPreferencial?: null;
    grupoInteres?: null;
    tratamiento?: string;
    saludo?: string;
}

export interface Empresa {
    razonsocial: string;
    descripción?: string;
    tipoEmpresa?: string;
    tipoEmpresaPrivada?: string;
    otroTipoEmpresaPrivada?: string;
    digitoVerificacion?: string;
}

export interface DireccionesEntity {
    id?: number;
    codigoContinente?: string;
    codigoPais: string;
    tipo: string;
    telefonos?: (TelefonosEntity | null)[] | null;
    descripcion: string;
    codigoCiudad: number;
    codigoRegion: number;
}
export interface TelefonosEntity {
    id?: number;
    extension?: string | null;
    numero: string;
    tipo: string;
}
export interface EmailsEntity {
    id?: number;
    tipo: string;
    descripcion: string;
}
