import { Injectable } from '@angular/core';
import { PreguntaResponse } from '../models/response/preguntaResponse';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient,HttpResponse } from '@angular/common/http';
import { PreguntaRequest } from '../models/request/preguntaRequest';
import { DataResponse } from '../models/response/dataResponse';
import { EvaluarRequest } from '../models/request/evaluarRequest';
import { EvaluarResponse } from '../models/response/evaluarResponse';
import { EnvioCorreoRequest } from '../models/request/envioCorreoRequest';
import { EnvioCorreoResponse } from '../models/response/envioCorreoResponse';

@Injectable({
  providedIn: 'root'
})
export class EvaluarUsuarioService {
  constructor(
    private http: HttpClient,
  ) { }

  public generarPreguntas(param :PreguntaRequest): Observable<PreguntaResponse>{
    return this.http.post<PreguntaResponse>(`${environment.urlApi}/consulta_entrevista`, param);
  }
  public evaluarRespuestas(param :EvaluarRequest): Observable<HttpResponse<DataResponse<EvaluarResponse>>>{
    return this.http.post<DataResponse<EvaluarResponse>>(`${environment.urlApi}/consulta_base64`, param,{observe: 'response'});
  }
  public enviarCorreo(param : EnvioCorreoRequest): Observable<HttpResponse<EnvioCorreoResponse>>{
    return this.http.post<EnvioCorreoResponse>(`${environment.urlSvcGenerales}/api/enviocorreo/enviar-correo`, param,{observe: 'response'});
  }
}

