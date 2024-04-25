import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { ErrorComponent } from '../Shared/error/error.component';
import { EvaluarUsuarioComponent } from './evaluar-usuario/evaluar-usuario.component';


const childRoutesLayout: Routes = [
  {
    path: 'evaluar-usuario',
    title: 'Evaluar Usuario',
    component: EvaluarUsuarioComponent,
  },
  {
    path: 'ErrorPage',
    component: ErrorComponent,
  },
  // {
  //   path: '**',
  //   component: ErrorComponent,
  // },
];
const routes: Routes = [
  {
    path: '',
    title: 'IDE SOLUTION - Gestionar Entrevista',
    component: MenuComponent,
    children: childRoutesLayout,
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentRoutingModule { }
