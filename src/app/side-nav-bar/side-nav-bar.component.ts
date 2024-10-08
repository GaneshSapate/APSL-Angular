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

  @Input() eventObj={
    navDashboard:false,
    navHome:true,
    navPatient:false,
    navMaster:false,
    navSetting:false,
    navAbout:false,
    navContact:false
  }

  homeIcon:string = '../../assets/redshotIcon/home.svg';
  dashboardIcon:string = '../../assets/redshotIcon/dashboard.svg';
  patientIcon:string = '../../assets/redshotIcon/user.svg';
  masterIcon:string = '../../assets/redshotIcon/master.svg';
  settingIcon:string = '../../assets/redshotIcon/setting.svg';
  contactIcon:string = '../../assets/redshotIcon/contact.svg';
  infoIcon:string = '../../assets/redshotIcon/info.svg';

  constructor(private router : Router) { }

  ngOnInit(): void {
  }
  clickOnHome(){
    // this.router.navigate(['login-board',{outlets :{ childRout: ['home']}}])
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
