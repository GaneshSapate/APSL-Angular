import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegistrationComponent } from './registration/registration.component';
import { BillingDashboardComponent } from './home-page/billing-dashboard/billing-dashboard.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SelectLabComponent } from './select-lab/select-lab.component';
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
    path:"selectLab",component:SelectLabComponent
  },
  {
    path:'dashboard',loadChildren:()=>import("./login-board/login-board.module").then(m=>m.LoginBoardModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
