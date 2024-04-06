import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegistrationComponent } from './registration/registration.component';
import { BillingDashboardComponent } from './billing-dashboard/billing-dashboard.component';
import { PateintPageComponent } from './pateint-page/pateint-page.component';

const routes: Routes = [

  {
    path:"",redirectTo:"/login", pathMatch:"full"
  },
  {
    path:"login",component:LoginPageComponent
  },
  {
    path:"registration",component:RegistrationComponent
  },
  {
    path:"billing-dashboard",component:BillingDashboardComponent
  },
  {
    path:"pateint-dashboard",component:PateintPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
