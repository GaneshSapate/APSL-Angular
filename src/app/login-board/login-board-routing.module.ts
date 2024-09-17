import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillingDashboardComponent } from '../billing-dashboard/billing-dashboard.component';
import { PateintPageComponent } from '../pateint-page/pateint-page.component';
import { HomePageComponent } from '../home-page/home-page.component';
import { MasterComponent } from '../master/master.component';

const routes: Routes = [
  // {
  //   path:"",component:HomePageComponent
  // },
  {
    path:"",component:BillingDashboardComponent
  },
  {
    path:"home", component:HomePageComponent, outlet:"childRout"
  },
  {
    path:"pateintpage",component:PateintPageComponent
  },
  {
    path:"master",component:MasterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginBoardRoutingModule { }
