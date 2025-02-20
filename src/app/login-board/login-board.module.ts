import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingDashboardComponent } from '../home-page/billing-dashboard/billing-dashboard.component';
import { LoginBoardRoutingModule } from './login-board-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HomePageComponent } from '../home-page/home-page.component';
import { BillingDashboardNavbarComponent } from '../home-page/billing-dashboard-navbar/billing-dashboard-navbar.component';
import { MasterComponent } from '../master/master.component';
import { SettingComponent } from '../home-page/setting/setting.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgChartsModule } from 'ng2-charts';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SideNavBarComponent } from '../side-nav-bar/side-nav-bar.component';
import { PateintPageComponent } from '../pateint-page/pateint-page.component';
import { MasterLabManagementComponent } from '../master/master-lab-management/master-lab-management.component';
import { MasterDocterManagementComponent } from '../master/master-docter-management/master-docter-management.component';
import { TestMasterComponent } from '../master/test-master/test-master.component';
import { EntryModalComponent } from '../entry-page/entry-modal/entry-modal.component';
import { UserManagementComponent } from '../master/user-management/user-management.component';
import { MasterMenuComponent } from '../master/master-menu/master-menu.component';
import { PatientDetailsComponent } from '../pateint-page/patient-details/patient-details.component';
import { PatientListComponent } from '../pateint-page/patient-list/patient-list.component';
import { EntryListComponent } from '../entry-page/entry-list/entry-list.component';
import { EntryDetailsComponent } from '../entry-page/entry-details/entry-details.component';
import { EntryPageComponent } from '../entry-page/entry-Page.component';
import { HomePageDetailsComponent } from '../home-page/home-page-details/home-page-details.component';
import { PatientModalComponent } from '../pateint-page/patient-modal/patient-modal.component';
import { NewLabRegistrationComponent } from '../new-lab-registration/new-lab-registration.component';


@NgModule({
  declarations: [
    HomePageComponent,
    BillingDashboardNavbarComponent,
    BillingDashboardComponent,
    MasterComponent,
    SettingComponent,
    SideNavBarComponent,
    PateintPageComponent,
    MasterLabManagementComponent,
    MasterDocterManagementComponent,
    TestMasterComponent,
    EntryModalComponent,
    UserManagementComponent,
    MasterMenuComponent,
    PatientDetailsComponent,
    PatientListComponent,
    EntryListComponent,
    EntryDetailsComponent,
    EntryPageComponent,
    HomePageDetailsComponent,
    PatientModalComponent,
    NewLabRegistrationComponent
  ],
  imports: [
    CommonModule,
    LoginBoardRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgChartsModule,
    AngularEditorModule,
    ToastrModule.forRoot(),
    DragDropModule,
    
  ]
})
export class LoginBoardModule { }
