import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./Principal/principal.module').then(m => m.PrincipalModule)
  },
  {
    path: 'entrevista',
    loadChildren: () => import('./Components/component.module').then(m => m.ComponentModule)

  },
  //{path:'login',component: LoginComponent},
  //{path:'',component: HomeComponent},
  //{path:'home',component: HomeComponent},
  //{path:'error',component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
