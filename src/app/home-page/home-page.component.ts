import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {



  @Output() sideNavHome = new EventEmitter<any>();
  navPatient:boolean=false;
  navHome:boolean=false;
  navDashboard:boolean=false;
  navSetting:boolean=false;
  navAbout:boolean=false;
  navContact:boolean=false;

  eventObj={
    navDashboard:false,
    navHome:true,
    navPatient:false,
    navMaster:false,
    navSetting:false,
    navAbout:false,
    navContact:false
  }

  patientList=[
    {
      patientId:1,
      patientName:"Ganesh Sapate",
      gender:"M",
      mobileNo:"9096916759",
      addedDate:new Date().toLocaleString(),
    },
    {
      patientId:2,
      patientName:"Shivprasad Gaikwad",
      gender:"M",
      mobileNo:"9096916759",
      addedDate:new Date().toLocaleString(),
    },
    {
      patientId:3,
      patientName:"Ganesh Sapate",
      gender:"M",
      mobileNo:"9096916759",
      addedDate:new Date().toLocaleString(),
    },
    {
      patientId:4,
      patientName:"Ganesh Sapate",
      gender:"M",
      mobileNo:"9096916759",
      addedDate:new Date().toLocaleString(),
    },
    {
      patientId:5,
      patientName:"Ganesh Sapate",
      gender:"M",
      mobileNo:"9096916759",
      addedDate:new Date().toLocaleString(),
    },
    {
      patientId:6,
      patientName:"Ganesh Sapate",
      gender:"M",
      mobileNo:"9096916759",
      addedDate:new Date().toLocaleString(),
    },
    {
      patientId:7,
      patientName:"Ganesh Sapate",
      gender:"M",
      mobileNo:"9096916759",
      addedDate:new Date().toLocaleString(),
    },
    {
      patientId:8,
      patientName:"Ganesh Sapate",
      gender:"M",
      mobileNo:"9096916759",
      addedDate:new Date().toLocaleString(),
    },
    {
      patientId:9,
      patientName:"Ganesh Sapate",
      gender:"M",
      mobileNo:"9096916759",
      addedDate:new Date().toLocaleString(),
    },
    {
      patientId:10,
      patientName:"Ganesh Sapate",
      gender:"M",
      mobileNo:"9096916759",
      addedDate:new Date().toLocaleString(),
    },
    {
      patientId:11,
      patientName:"Ganesh Sapate",
      gender:"M",
      mobileNo:"9096916759",
      addedDate:new Date().toLocaleString(),
    },
    {
      patientId:12,
      patientName:"Ganesh Sapate",
      gender:"M",
      mobileNo:"9096916759",
      addedDate:new Date().toLocaleString(),
    },
    {
      patientId:13,
      patientName:"Ganesh Sapate",
      gender:"M",
      mobileNo:"9096916759",
      addedDate:new Date().toLocaleString(),
    }
  ];

  p:number=1;

  nameSearch:string='';

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
