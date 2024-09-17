import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegistrationComponent } from './registration/registration.component';
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
    path:'login-board',loadChildren:()=>import("./login-board/login-board.module").then(m=>m.LoginBoardModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
