import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

type CallbackFunction = (param: void) => void;

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loading: HTMLIonLoadingElement | null = null;
  private counter = 0;

  constructor(
    private loadingController:LoadingController,
  ) {}


  // Presenta un loading
  async presentLoading(message: string) {
    this.counter++;

    if (this.counter === 1) {
      this.loading = await this.loadingController.create({ message });
      await this.loading.present();
    }
  }

  // Oculta un loading
  async dismissLoading(handle?: CallbackFunction) {
    this.counter--;

    if (this.counter <= 0 && this.loading) {
      await this.loading.dismiss();
    }

    if(handle){
      handle();
    }
  }
}
