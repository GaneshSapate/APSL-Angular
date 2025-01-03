import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.css']
})
export class SideNavBarComponent implements OnInit {

  homePage:boolean=false;
  @Input() sideNavStatus:boolean=true;


  @Output() sideNavPatient = new EventEmitter<any>();
  navPatient:boolean=false;
  navHome:boolean=false;
  navDashboard:boolean=false;
  navSetting:boolean=false;
  navAbout:boolean=false;
  navContact:boolean=false;
  navEntry:boolean=false;

  @Input() eventObj={
    navDashboard:false,
    navHome:true,
    navPatient:false,
    navMaster:false,
    navSetting:false,
    navAbout:false,
    navContact:false,
    navEntry:false
  }

  constructor(private router : Router) { }

  ngOnInit(): void {
  }
  clickOnHome(){
    this.clearAll();
    if(this.eventObj.navHome==false){
     this.eventObj.navHome=true;
    }
    this.sideNavPatient.emit(this.eventObj);
    this.router.navigate(["dashboard/home"]);
  }
  clickOnEntry(){
    this.clearAll();
    if(this.eventObj.navEntry==false){
      this.eventObj.navEntry=true;
     }
    this.sideNavPatient.emit(this.eventObj);
    this.router.navigate(["dashboard/entryList"]);
  }
  clickOnDashboard(){
    this.clearAll();
    if(this.eventObj.navDashboard==false){
      this.eventObj.navDashboard=true;
     }
    this.sideNavPatient.emit(this.eventObj);
    this.router.navigate(["dashboard/dashboardDetails"]);
  }
  clickOnPateint(){
    this.clearAll();
    if(this.eventObj.navPatient==false){
      this.eventObj.navPatient=true;
     }
    this.sideNavPatient.emit(this.eventObj);
    this.router.navigate(["dashboard/pateint"]);
  }
  clickOnMaster(){
    this.clearAll();
    if(this.eventObj.navMaster==false){
      this.eventObj.navMaster=true;
     }
    this.sideNavPatient.emit(this.eventObj);
    this.router.navigate(["dashboard/master"]);
  }

  clickOnSetting(){
    this.clearAll();
    if(this.eventObj.navSetting==false){
      this.eventObj.navSetting=true;
     }
    this.sideNavPatient.emit(this.eventObj);
    this.router.navigate(["dashboard/setting"]);
  }
  clickOnAbout(){
    this.clearAll();
    if(this.eventObj.navAbout==false){
      this.eventObj.navAbout=true;
     }
    this.sideNavPatient.emit(this.eventObj);
    // this.router.navigate(["dashboard/about"]);
  }
  clickOnContact(){
    this.clearAll();
    if(this.eventObj.navContact==false){
      this.eventObj.navContact=true;
     }
    this.sideNavPatient.emit(this.eventObj);
    // this.router.navigate(["dashboard/contact"]);
  }

  clearAll(){
    this.eventObj.navDashboard=false;
      this.eventObj.navHome=false;
      this.eventObj.navPatient=false;
      this.eventObj.navMaster=false;
      this.eventObj.navSetting=false;
      this.eventObj.navAbout=false;
      this.eventObj.navContact=false;
      this.eventObj.navEntry=false;
  }

}
