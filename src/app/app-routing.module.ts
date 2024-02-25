import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectComponent } from './login/connect.component';
import { LoginComponent } from './login/login.component';
import { StarterComponent } from './starter/starter.component';
export const Approutes: Routes = [

    { path: 'login', component: LoginComponent },
    { path: 'connect/:usuario/:pass/:idGrupReal', component: ConnectComponent },
    { path: 'starter', component: StarterComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },


];

@NgModule({
  imports: [RouterModule.forRoot(Approutes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

  
