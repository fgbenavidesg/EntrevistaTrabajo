import { Injectable } from '@angular/core';
import { PreguntaResponse } from '../models/response/preguntaResponse';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PreguntaRequest } from '../models/request/preguntaRequest';

@Injectable({
  providedIn: 'root'
})
export class EvaluarUsuarioService {

  constructor(
    private http: HttpClient,
  ) { }

  public GenerarPreguntas(param :PreguntaRequest): Observable<PreguntaResponse>{
    return this.http.get<PreguntaResponse>(`${environment.urlApi}/consulta_get/${param.perfil}/${param.nivel}/${param.preguntas}`)
  }
  // public GenerarPreguntas(param :PreguntaRequest): Observable<PreguntaResponse>{
  //   return this.http.post<PreguntaResponse>(`${environment.urlApi}/consulta_post`, param);
  // }
}

