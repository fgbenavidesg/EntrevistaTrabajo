import { Injectable } from '@angular/core';
import { EvaluarUsuarioService } from '../services/evaluar-usuario.service';
import { PreguntaRequest } from '../models/request/preguntaRequest';
import { LoadingService } from '../utils/loading.service';
import { catchError, finalize, map, of, tap } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { AlertService } from '../utils/alert.service';
import { EvaluarRequest } from '../models/request/evaluarRequest';
import { EnvioCorreoRequest } from '../models/request/envioCorreoRequest';

@Injectable({
  providedIn: 'root'
})
export class EvaluarUsuarioLogicService {

  constructor(
    private toast: ToastController,
    private loadingService: LoadingService,
    private evaluarsvc : EvaluarUsuarioService,
    private alertService : AlertService
  ) { }

  EvaluarRespuestas(param: EvaluarRequest){
    this.loadingService.presentLoading("Evaluando Respuesta ...");
    return this.evaluarsvc.evaluarRespuestas(param).pipe(
      catchError(error => {
        console.log(error)
        this.presentToast(
          error.statusText,
          'danger'
        );
        this.loadingService.dismissLoading();
        return of(null);
      }),
      tap((resp)=>{
        if(resp?.body?.codigo==0){
          this.presentToast(
            resp.body.mensaje,
            'danger'
          );
          this.loadingService.dismissLoading();
        }
      }),
      finalize(() => {
        this.loadingService.dismissLoading();
      }),
      map((resp)=>resp?.body?.respuestas),
    );
  }
  GenerarPreguntas(param: PreguntaRequest){
    this.loadingService.presentLoading("Generando Preguntas...");
    return this.evaluarsvc.generarPreguntas(param).pipe(
      catchError(error => {
        console.log(error)
        this.loadingService.dismissLoading();
        this.presentToast(
          error.statusText,
          'danger'
        );
        return of(null);
      }),
      tap((resp)=>{
        if(resp?.codigo==0){
          this.presentToast(
            resp.mensaje,
            'danger'
          );
          this.loadingService.dismissLoading();
        }
      }),
      finalize(() => {
        this.loadingService.dismissLoading();
      }),
    );
  }
  EnviarCorreo(param: EnvioCorreoRequest){
    this.loadingService.presentLoading("Enviando Evaluación al Correo  ...");
    return this.evaluarsvc.enviarCorreo(param).pipe(
      catchError(error => {
        console.log(error)
        this.loadingService.dismissLoading();
        this.presentToast(
          error.statusText,
          'danger'
        );
        return of(null);
      }),
      tap((resp)=>{
        if(resp?.body?.codigo!=="0"){
          console.log(resp?.body?.mensaje)
          this.presentToast(
            'Error al enviar el Correo',
            'danger'
          );
          this.loadingService.dismissLoading();
        }
      }),
      finalize(() => {
        this.loadingService.dismissLoading();
      }),
    );
  }
  async presentToast(message : any, color : any) {
    const toast = await this.toast.create({
      message,
      color,
      position: 'top',
      duration: 2000,
    });
    toast.present();
  }

}
