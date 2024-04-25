import { Component, ComponentRef, Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private modalCtrl : ModalController
  ) { }

  async openModalUser(insertComponent: any) {

    const modal = await this.modalCtrl.create({
      component: insertComponent,
    });

    await modal.present();

  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

}
