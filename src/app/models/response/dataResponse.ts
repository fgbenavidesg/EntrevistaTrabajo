export interface DataResponse<T> {
    respuestas:      T;
    codigo:      number | string;
    descripcion: string;
    mensaje:     string;
}
