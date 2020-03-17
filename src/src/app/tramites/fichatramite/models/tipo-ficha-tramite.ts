export class TipoFichaTramite {
  message: string;
  StatusCode: string;
}
export class DatosBaseFichaTramite {
  IdTramite: string;
  NombreEstandarizado: string;
  Proposito: string;
  Entidad: string;
}
export class TipoEnlace {
  IdTramite: string;
  Tipotramite: string;
  UrlTramiteEnLinea: string;
  PaginaWeb: string;
}
export class TipoAudiencia {
  tipoaudiencia: string;
}
export class MomentosAudienciaTitulo {
  Descripcion: string;
  Orden: number;
  Informacion = [];
}
export class DataMomentosAudiencia {
  OrdenMomento: number;
  Nombre: string;
  NombreResultado: string;
  Proposito: string;
  UrlResultadoWeb: string;
  UrlTramiteEnLinea: string;
  TipoAudiencia: string;
  TipoAccionCondicion: string;
  DocumentoTipo: string;
  DocumentoNombre: string;
  DocumentoAnotacionAdicional: string;
  PagoDisponibleEnLinea: string;
  PagoDispEnInstitucion: string;
  PagoDispEntidadRecaudadora: string;
  PagoDispInstDescripcion: string;
  PagoEnlineaUrl: string;
  FormularioAnotacion: string;
  FormularioNombre: string;
  VerificacionInstDescripcion: string;
  AtencionDescripcion: string;
  ExcepcionId: string;
  Excepcion: string;
  FormularioUrlDescarga: string;
  CantidadSmlv: string;
  Moneda: string;
  TipoValor: string;
  Valor: string;
  CodigoRecaudo: string;
  DescripcionOtro: string;
  NombreCuenta: string;
  NombreEntidad: string;
  NumeroCuenta: string;
  TipoCuenta: string;
  OrdenPago: number;
  DescripcionMomento: string;
  DescripcionPago: string;
  OrdenAccion: string;
  CondicionNueva: string;
  AccionCondicionId: string;
  UnidadCantidad: string;
  CantidadDoc: string;
  ObservacionCantidad: string;
}
export class CanalesAtencion {
  TipoTelefono: string;
  ExtensionTelFijo: string;
  HorarioAtencionTelef: string;
  MunicipioTelefono: string;
  NombreCanalWeb: string;
  NumeroTelefono: string;
  TipoCanal: string;
  Correo: string;
  UrlCanalWeb: string;
}
export class PuntosAtencion {
  PuntoAtencionId: string;
  PuntoAtencionNombre: string;
  HorarioAtencion: string;
  PuntoAtencionDireccion: string;
  PuntoAtencionTelefono: string;
  Latitud: string;
  Longitud: string;
  Municipio: string;
  Departamento: string;
}
export class InformacionPago {
  CantidadSmlv: string;
  Moneda: string;
  TipoValor: string;
  Valor: string;
  OrdenPago: number;
  DescripcionPago: string;
  CodigoRecaudo: string;
  DescripcionOtro: string;
  NombreCuenta: string;
  NombreEntidad: string;
  NumeroCuenta: string;
  TipoCuenta: string;
  DescripcionMomento: string;
}
export class Normatividad {
  TipoNorma: string;
  NumeroNorma: string;
  AnoNorma: string;
  Articulos: string;
  UrlNorma: string;
  UrlDescarga: string;
}
export class PuntosAtencionFicha {
  MunicipioCodigoDane: string;
  MunicipioNombre: string;
  DepartamentoCodigoDane: string;
  DepartamentoNombre: string;
  IdTramiteMunicipio;
}
export class PuntosFichaTramiteEstandar {
  Puntos: PuntosAtencionFicha[];
  NombreEstandarizado: string;
  Proposito: string;
}
export class Embebidos {
  EMBEBIDO: string;
  URL_TRAMITE: string;
}
export class TramiteNoSuite {
  Nombre: string;
  Descripcion: string;
  Proposito: string;
  Consideraciones: string;
  ResultadoOtroServicio: string;
  CodigoEstado: string;
}
export class Condiciones {
  CondicionesAdicionales: string;
}
export class PuntosAtencionNoSuite {
  PuntosAtencionId: string;
}





