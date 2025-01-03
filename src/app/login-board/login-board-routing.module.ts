import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillingDashboardComponent } from '../home-page/billing-dashboard/billing-dashboard.component';
import { PateintPageComponent } from '../pateint-page/pateint-page.component';
import { HomePageComponent } from '../home-page/home-page.component';
import { MasterComponent } from '../master/master.component';
import { SettingComponent } from '../home-page/setting/setting.component';
import { HomePageDetailsComponent } from '../home-page/home-page-details/home-page-details.component';
import { MasterDocterManagementComponent } from '../master/master-docter-management/master-docter-management.component';
import { TestMasterComponent } from '../master/test-master/test-master.component';
import { MasterLabManagementComponent } from '../master/master-lab-management/master-lab-management.component';
import { MasterMenuComponent } from '../master/master-menu/master-menu.component';
import { PatientListComponent } from '../pateint-page/patient-list/patient-list.component';
import { PatientDetailsComponent } from '../pateint-page/patient-details/patient-details.component';
import { EntryListComponent } from '../entry-page/entry-list/entry-list.component';
import { EntryPageComponent } from '../entry-page/entry-Page.component';
import { EntryDetailsComponent } from '../entry-page/entry-details/entry-details.component';

const routes: Routes = [
  {
    path:"",component:HomePageComponent,
    children: [
      {path: 'home', component: HomePageDetailsComponent}, 
      {path: 'pateint', component: PateintPageComponent,
        children:[
          {path: '', component: PatientListComponent},
          {path: 'PatientDetails/:pid/:eid', component: PatientDetailsComponent},
        ]
      }, 
      {path: 'dashboardDetails', component: BillingDashboardComponent}, 
      {path: 'master', component: MasterComponent,
        children:[
          {path: '', component: MasterMenuComponent},
          {path: 'doctersManagement', component: MasterDocterManagementComponent},
          {path: 'reportsManagement', component: TestMasterComponent},
          {path: 'labDetailsManagement', component: MasterLabManagementComponent},
        ]
       },
      {path: 'setting', component: SettingComponent},
      {path: 'entryList', component:EntryPageComponent,
        children:[
          {path: '', component: EntryListComponent},
          {path: 'entryDetails/:pid/:eid', component: EntryDetailsComponent}
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginBoardRoutingModule { }
