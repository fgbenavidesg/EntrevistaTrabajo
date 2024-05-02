export interface PreguntaResponse {
  respuestas?: Respuesta[];
  codigo: number,
  descripcion: string,
  mensaje:string,
}
export interface Respuesta {
  id: number;
  descripcion: string;
}

