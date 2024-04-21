import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { IonicModule } from '@ionic/angular';
import { HomeComponent } from './home/home.component';
import { EvaluarUsuarioComponent } from './evaluar-usuario/evaluar-usuario.component';
import { ComponentRoutingModule } from './component-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../Shared/shared.module';

@NgModule({
  declarations: [
    MenuComponent,
    HomeComponent,
    EvaluarUsuarioComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    ComponentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ComponentModule { }
