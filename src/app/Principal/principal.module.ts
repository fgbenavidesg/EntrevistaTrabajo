import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PrincipalRoutingModule } from './principal-routing.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../Shared/shared.module';
import { ModalLoginComponent } from './home/modal-login/modal-login.component';
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [
    ModalLoginComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PrincipalRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class PrincipalModule { }
