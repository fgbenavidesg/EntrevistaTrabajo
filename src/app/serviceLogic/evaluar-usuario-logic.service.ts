import { Injectable } from '@angular/core';
import { EvaluarUsuarioService } from '../services/evaluar-usuario.service';
import { PreguntaRequest } from '../models/request/preguntaRequest';
import { LoadingService } from '../utils/loading.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvaluarUsuarioLogicService {

  constructor(
    private loadingService: LoadingService,
    private evaluarsvc : EvaluarUsuarioService
  ) { }



}
