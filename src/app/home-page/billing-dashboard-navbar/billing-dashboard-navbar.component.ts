import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Output,EventEmitter, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService, ToastPackage } from 'ngx-toastr';
import { MasterDataService } from '../../master-data.service';
import { ErrorObj } from '../../Model/ErrorObj';

@Component({
  selector: 'app-billing-dashboard-navbar',
  templateUrl: './billing-dashboard-navbar.component.html',
  styleUrls: ['./billing-dashboard-navbar.component.css']
})
export class BillingDashboardNavbarComponent implements OnInit {

  useThemeDetector(){
   const value = window.matchMedia("(prefers-color-scheme: dark)").matches;
   if(value){
    this.darkMode();
   }
  }

  darkFlag:boolean=false;

  mode:any=this.document.querySelector('html')?.getAttributeNode('data-bs-theme')

  lightMode() {
    this.darkFlag=!this.darkFlag;
    this.mode.value='light';
  }
  darkMode() {
    this.darkFlag=!this.darkFlag;
    this.mode.value='dark';
  }


  @Output() sideNavToggled = new EventEmitter<boolean>();
  menuStatus:boolean=false;

  //full screen button variables
  fullScreenFlag:boolean=false;
  elem:any;

  //add patient varivable

 @Output() addPatientEvent = new EventEmitter<any>();

  eventObj={
    navPatient:false,
    navHome:false,
    navDashboard:false,
    navMaster:false,
    navSetting:false,
    navAbout:false,
    navContact:false,
    navEntry:false
  }


  notification = [
    {
      nId:1,
      message:"1 Hello, world! This is a toast message."
    }
  ]
 countOfNotification:number=0;

 noNotification:boolean=false;

 stateList=[
  {
    id: 0,
    code: "",
    discription: ""
  }
 ];
 districtList=[
  {
    id: 0,
    stateCode: "",
    discription: ""
  }
 ];

 state:string="";
 district:string="";

 error=<ErrorObj>{};
  constructor( @Inject(DOCUMENT) private document: any,
                  private router: Router,
                  private toaster : ToastrService,
                  private masterService: MasterDataService) { }

  ngOnInit(): void {
    this.getCountOfNotification();
    this.elem = document.documentElement;
    this.masterService.getAllState().subscribe( (r) => {
        this.stateList = <any> r;
      });

     this.useThemeDetector();
  }

  onClickToggled(){
    this.menuStatus = !this.menuStatus;
    this.sideNavToggled.emit(this.menuStatus);
  }

  getCountOfNotification(){
    this.countOfNotification = this.notification.length;
    if(this.countOfNotification == 0){
      this.noNotification = true;
    }
  }

  closeNotification(obj:number){
    this.notification.splice(obj,1);
    this.getCountOfNotification();
  }

  clearAllNotification(){
    this.notification.splice(0,this.notification.length);
    this.getCountOfNotification();
  }

   menuToggle() {
    const toggleMenu = document.querySelector(".menu");
    if(toggleMenu !=null){
      toggleMenu.classList.toggle("active");
    }
    
  }

  openFullscreen() {
    this.fullScreenFlag=!this.fullScreenFlag;
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
  }
/* Close fullscreen */
  closeFullscreen() {
    this.fullScreenFlag=!this.fullScreenFlag;
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
    } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
    }
  }


  addPatient(){


    //call this in subscribe

    this.eventObj.navDashboard=false;
    this.eventObj.navHome=false;
    this.eventObj.navEntry=true
    this.eventObj.navPatient=false;
    this.eventObj.navMaster=false;
    this.eventObj.navSetting=false;
    this.eventObj.navAbout=false;
    this.eventObj.navContact=false;
    this.addPatientEvent.emit(this.eventObj);
    this.router.navigate(["dashboard/pateint"]);
  }

// Profile button all method start
    onLogoutClick() {
      this.toaster.success("Logout Successfully");
      this.router.navigate(['/login'])
    }
    onSecurityClick() {
      this.eventObj.navDashboard=false;
      this.eventObj.navHome=false;
      this.eventObj.navEntry=false;
      this.eventObj.navPatient=false;
      this.eventObj.navMaster=false;
      this.eventObj.navSetting=true;
      this.eventObj.navAbout=false;
      this.eventObj.navContact=false;
      this.addPatientEvent.emit(this.eventObj);
    }
    onSettingClick() {
      this.eventObj.navDashboard=false;
      this.eventObj.navHome=false;
      this.eventObj.navEntry=false;
      this.eventObj.navPatient=false;
      this.eventObj.navMaster=false;
      this.eventObj.navSetting=true;
      this.eventObj.navAbout=false;
      this.eventObj.navContact=false;
      this.addPatientEvent.emit(this.eventObj);
    }
    onProfileClick() {
      this.eventObj.navDashboard=false;
      this.eventObj.navHome=false;
      this.eventObj.navPatient=false;
      this.eventObj.navMaster=false;
      this.eventObj.navSetting=true;
      this.eventObj.navAbout=false;
      this.eventObj.navContact=false;
      this.addPatientEvent.emit(this.eventObj);
    }
  // Profile button all method end

    showtoast(){
      this.toaster.info("<br><button type='button' class='btn clear'>Yes</button>","Delete all?", {
        timeOut: 3000,
        progressBar: true,
        positionClass: 'toast-top-center',
        closeButton:true,
        enableHtml:true,
        tapToDismiss:false,
        toastClass:'ngx-toastr',
        
      }) ;
    }
    onSelectState() {
        if(this.state ){
          this.masterService.getDistrictByStateCode(this.state).subscribe(
            (result)=>{
              this.districtList = <any> result;
          })
        }
        
      }
}
