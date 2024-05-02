import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ErrorComponent } from './error/error.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    ErrorComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    ErrorComponent,
    FooterComponent,
  ]
})
export class SharedModule { }
