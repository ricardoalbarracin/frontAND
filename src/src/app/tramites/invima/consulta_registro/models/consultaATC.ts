export interface ConsultaRegistro {
    criterio: string;    
    expediente: string;
    categoria:string;
}

export interface ConsultaGeneralATCHeader {
    linkNext: string;    
    linkFirst: string;
    linkLast:string;
    X_Total_Records:string;
    objLista:ConsultaGeneralATCBody[];
}

export interface ConsultaGeneralATCBody{
    numeroexpediente: string;    
    nombreproducto:string;
    numeroregistrosanitario: string;
    estado:string;
    fechavencimiento:string;    
    modalidad:string;
}

export interface IConsultaRegistro{
    estado:string;
    fechavencimiento:string;
    modalidad:string;
    nombreproducto:string;
    numeroexpediente:string;
    numeroregistrosanitario: string;
    titulares: string;
}

export interface ConsultaDetalleATCRoles{
    rol: string;    
    razonSocial: string;    
    numeroIdentificacion: string;    
    tipoIdentificacion: string;    
    email: string;    
    direccion: string;    
    ciudad: string;    
    pais: string;    
    departamento: string;    
    territorio: string;    
    cdgTerritorio: string;    
    cdgPais: string;    
}

export interface ConsultaDetalleATCAtcs{
    codigo : string;    
    sustancia_quimica : string;    
    sistema_organico : string;    
    grupo_farmacologico : string;    
    subgrupo_farmacologico : string;    
    subgrupo_quimico : string;    
}

export interface ConsultaDetalleATCPresentacionCum{
    consecutivo : string;
    nroexpediente : string;
    termino : string;
    unidades : string;
    cantidadUnidades : string;
    presentacion : string;
    condicionVenta : string;
    fechaInscripcion : string;
    estado : string;
    fechaInactivacion : string;
}

export interface  ConsultaDetalleATCHeader{
    idregistrosanitario: string;    
    numeroregistrosanitario: string;    
    fechavencimiento: string;    
    fechaExpedicion : string;    
    estado : string;    
    numeroexpediente : string;    
    idtramite : string;    
    modalidad : string;    
    nombreproducto : string;    
    descripcioncomun : string;    
    titulares : string;    
    inserto : string;    
    observaciones : string;    
    formaFarmaceutica : string;    
    franja : string;    
    indicaciones : string;    
    contraindicaciones : string;    
    viasAdministracion : string;    
    vidaUtil : string;    
    condicionVenta : string;    
    generico : string;    
    importadores : string;    
    fabricantes : string;    
    titularidad : string;    
    principios : string;    
    atcs : ConsultaDetalleATCAtcs[];    
    roles :ConsultaDetalleATCRoles[];
    marcas : string;    
    tratamiento : string;    
    condicionesConservacion : string;    
    presentacionescum : ConsultaDetalleATCPresentacionCum[];    
    presentaciones : string[];    
    concentracionDecreto : string;    
    grado_alcoholico : string;    
    clasificacion : string;    
    grp_cosmetico_amparado : string;    
    usos : string;    
    precauciones : string;    
    cdgproducto : string;    
    cdg_forma_csmtca : string;    
    forma_cosmetica : string;    
    referencia : string;    
    riesgo : string;    
    miembroscomprometidos : string;    
    plagas_objetivo : string;    
    antidotos : string;    
    advertencias : string;    
    observacionesGrupo : string;    
    concepto_toxicologico : string;    
    cdg_ctgr_toxicologica : string;    
    ctgr_toxicologica : string;    
    nivel_riesgo : string;    
    clase : string;    
    variedades : string;    
    referencia_autorizada : string;    
    area_analisis : string;    
    uso_terapeutico : string;    
    nta_farmacovigilancia : string;    
    diluciones : string;    
    tipo_homeopatico : string;    
    prefijo_registro : string;    
    condiciones_conservacion : string;    
    propiedades : string;    
    proclama : string;    
    natural : string;    
    concentracion : string;    
    descripcionConcentracion : string;    
    embargo : string;
}