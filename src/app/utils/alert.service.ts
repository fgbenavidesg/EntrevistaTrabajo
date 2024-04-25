import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

type CallbackFunction = (param: void) => void;

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private alert: HTMLIonAlertElement | null = null;
  private counter = 0;

  constructor(
    private alertController: AlertController,
  ) { }

  // Muestra un mensaje con botones ACEPTAR, acción al hacer clic en ACEPTAR
  async showAlertOk(header : string, mensaje : string, handler?: CallbackFunction) {
    this.counter++;

    if(this.counter === 1){
      this.alert = await this.alertController.create({
        header : header,
        message: mensaje,
        backdropDismiss: false,
        cssClass: 'customAlert',
        keyboardClose: false,
        buttons : [
          {
            text: 'ACEPTAR',
            role: 'confirm',
            cssClass: 'btn-ok',
            handler: () => {
              this.counter = 0;
              if(handler){
                handler();
              }
            },
          },
        ]
      });
      await this.alert.present();
    }
  }

  // Muestra un mensaje con botones ACEPTAR y  CANCELAR, acción al hacer clic en ACEPTAR
  async showAlertOkCancel(header : string, mensaje : string, handler?: CallbackFunction) {
    this.counter++;

    if(this.counter === 1){
      this.alert = await this.alertController.create({
        header : header,
        message: mensaje,
        cssClass: 'customAlert',
        buttons : [
          {
            text: 'CANCELAR',
            role: 'cancel',
            cssClass: 'btn-cancel',
            handler: () => {
              this.counter = 0;
            }
          },
          {
            text: 'CONTINUAR',
            role: 'confirm',
            cssClass: 'btn-ok',
            handler: () => {
              this.counter = 0;
              if(handler){
                handler();
              }
            }
          },
        ]
      });
      await this.alert.present();
    }
  }
}
