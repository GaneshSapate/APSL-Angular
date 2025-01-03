import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegistrationComponent } from './registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NgxPaginationModule } from 'ngx-pagination';
import { NgChartsModule } from 'ng2-charts';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { SafePipe } from './safe.pipe';
import { TokenInterceptorService } from './service/token-interceptor.service';
import { HomePageDetailsComponent } from './home-page/home-page-details/home-page-details.component';
import { MasterMenuComponent } from './master/master-menu/master-menu.component';
import { PatientDetailsComponent } from './pateint-page/patient-details/patient-details.component';
import { PatientListComponent } from './pateint-page/patient-list/patient-list.component';
import { EntryListComponent } from './entry-page/entry-list/entry-list.component';
import { EntryDetailsComponent } from './entry-page/entry-details/entry-details.component';
import { EntryPageComponent } from './entry-page/entry-Page.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    NavbarComponent,
    SafePipe,
    LoginPageComponent,
    HomePageDetailsComponent,
    MasterMenuComponent,
    PatientDetailsComponent,
    PatientListComponent,
    EntryDetailsComponent,
    EntryListComponent,
    EntryPageComponent
  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgChartsModule,
    AngularEditorModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    DragDropModule,
    NgxExtendedPdfViewerModule,

  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:TokenInterceptorService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
