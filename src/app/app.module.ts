import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegistrationComponent } from './registration/registration.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { BillingDashboardComponent } from './billing-dashboard/billing-dashboard.component';
import { BillingDashboardNavbarComponent } from './billing-dashboard-navbar/billing-dashboard-navbar.component';
import { HttpClientModule } from "@angular/common/http";
import { SideNavBarComponent } from './side-nav-bar/side-nav-bar.component';
import { PateintPageComponent } from './pateint-page/pateint-page.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { HomePageComponent } from './home-page/home-page.component';
import { MasterComponent } from './master/master.component';
import { SettingComponent } from './setting/setting.component';
import { NgChartsModule } from 'ng2-charts';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { SafePipe } from './safe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegistrationComponent,
    NavbarComponent,
    BillingDashboardComponent,
    BillingDashboardNavbarComponent,
    SideNavBarComponent,
    PateintPageComponent,
    HomePageComponent,
    MasterComponent,
    SettingComponent,
    SafePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgChartsModule,
    AngularEditorModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    DragDropModule,
    NgxExtendedPdfViewerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
