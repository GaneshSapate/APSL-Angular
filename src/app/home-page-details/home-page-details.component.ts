import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-home-page-details',
  templateUrl: './home-page-details.component.html',
  styleUrls: ['./home-page-details.component.css']
})
export class HomePageDetailsComponent implements OnInit {
  sideNavStatus:boolean=false;
  
    // side nav action 
    eventObj={
      navPatient:false,
      navHome:true,
      navDashboard:false,
      navMaster:false,
      navSetting:false,
      navAbout:false,
      navContact:false
    }
    chartOptions= {
      responsive: true,
      maintainAspectRatio: false,
    };
  
    @Output() sideNavHome = new EventEmitter<any>();
    navPatient:boolean=false;
    navHome:boolean=false;
    navDashboard:boolean=false;
    navSetting:boolean=false;
    navAbout:boolean=false;
    navContact:boolean=false;
  

  constructor() { }

  ngOnInit(): void {
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
    this.sideNavHome.emit(this.eventObj);
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
    this.sideNavHome.emit(this.eventObj);
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
    this.sideNavHome.emit(this.eventObj);
  }


}
