import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutServiceLogic {

  constructor() { }

  getStorage( value : string ): string{
    return sessionStorage.getItem(value) ?? '';
  }

}
