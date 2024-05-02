export interface EnvioCorreoRequest {
  correos_to: string;
  correo_cc: string;
  correo_cco: string;
  asunto: string;
  mensaje: string;
  nombre_config: string;
  adjuntos: Adjunto[];
}

export interface Adjunto {
  base64: string;
  extension: string;
  nombre_archivo: string;
  ruta: string;
}
