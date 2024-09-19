import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingDashboardComponent } from '../billing-dashboard/billing-dashboard.component';
import { LoginBoardRoutingModule } from './login-board-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HomePageComponent } from '../home-page/home-page.component';
import { BillingDashboardNavbarComponent } from '../billing-dashboard-navbar/billing-dashboard-navbar.component';
import { MasterComponent } from '../master/master.component';
import { SettingComponent } from '../setting/setting.component';
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
import { MasterLabManagementComponent } from '../master-lab-management/master-lab-management.component';
import { MasterDocterManagementComponent } from '../master-docter-management/master-docter-management.component';


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
