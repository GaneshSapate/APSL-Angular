import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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

  @Input() eventObj={
    navDashboard:false,
    navHome:true,
    navPatient:false,
    navMaster:false,
    navSetting:false,
    navAbout:false,
    navContact:false
  }

  constructor() { }

  ngOnInit(): void {
  }
  clickOnHome(){
    if(this.eventObj.navHome==false){
     this.eventObj.navDashboard=false;
     this.eventObj.navHome=true;
     this.eventObj.navPatient=false;
     this.eventObj.navMaster=false;
     this.eventObj.navSetting=false;
     this.eventObj.navAbout=false;
     this.eventObj.navContact=false;
    }
    this.sideNavPatient.emit(this.eventObj);
  }
  clickOnDashboard(){
    if(this.eventObj.navDashboard==false){
      this.eventObj.navDashboard=true;
      this.eventObj.navHome=false;
      this.eventObj.navPatient=false;
      this.eventObj.navMaster=false;
      this.eventObj.navSetting=false;
      this.eventObj.navAbout=false;
      this.eventObj.navContact=false;
     }
    this.sideNavPatient.emit(this.eventObj);
  }
  clickOnPateint(){
    if(this.eventObj.navPatient==false){
      this.eventObj.navDashboard=false;
      this.eventObj.navHome=false;
      this.eventObj.navPatient=true;
      this.eventObj.navMaster=false;
      this.eventObj.navSetting=false;
      this.eventObj.navAbout=false;
      this.eventObj.navContact=false;
     }
    this.sideNavPatient.emit(this.eventObj);
  }
  clickOnMaster(){
    if(this.eventObj.navMaster==false){
      this.eventObj.navDashboard=false;
      this.eventObj.navHome=false;
      this.eventObj.navPatient=false;
      this.eventObj.navMaster=true;
      this.eventObj.navSetting=false;
      this.eventObj.navAbout=false;
      this.eventObj.navContact=false;
     }
    this.sideNavPatient.emit(this.eventObj);
  }

  clickOnSetting(){
    if(this.eventObj.navSetting==false){
      this.eventObj.navDashboard=false;
      this.eventObj.navHome=false;
      this.eventObj.navPatient=false;
      this.eventObj.navMaster=false;
      this.eventObj.navSetting=true;
      this.eventObj.navAbout=false;
      this.eventObj.navContact=false;
     }
    this.sideNavPatient.emit(this.eventObj);
  }
  clickOnAbout(){
    if(this.eventObj.navAbout==false){
      this.eventObj.navDashboard=false;
      this.eventObj.navHome=false;
      this.eventObj.navPatient=false;
      this.eventObj.navMaster=false;
      this.eventObj.navSetting=false;
      this.eventObj.navAbout=true;
      this.eventObj.navContact=false;
     }
    this.sideNavPatient.emit(this.eventObj);
  }
  clickOnContact(){
    if(this.eventObj.navContact==false){
      this.eventObj.navDashboard=false;
      this.eventObj.navHome=false;
      this.eventObj.navPatient=false;
      this.eventObj.navMaster=false;
      this.eventObj.navSetting=false;
      this.eventObj.navAbout=false;
      this.eventObj.navContact=true;
     }
    this.sideNavPatient.emit(this.eventObj);
  }

}
