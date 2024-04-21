import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
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
