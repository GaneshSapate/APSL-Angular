import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Output,EventEmitter, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService, ToastPackage } from 'ngx-toastr';

@Component({
  selector: 'app-billing-dashboard-navbar',
  templateUrl: './billing-dashboard-navbar.component.html',
  styleUrls: ['./billing-dashboard-navbar.component.css']
})
export class BillingDashboardNavbarComponent implements OnInit {

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
    navContact:false
  }


  notification = [
    {
      nId:1,
      message:"1 Hello, world! This is a toast message."
    },
    {
      nId:2,
      message:"2 Hello, world! This is a toast message."
    },
    {
      nId:3,
      message:"3 Hello, world! This is a toast message. sdfvsdjfvasdf sdknvjsdkcvsd sdknvjksdv ksjvnjksdv lksdnnvjsd "
    },
    {
      nId:4,
      message:"4 Hello, world! This is a toast message."
    },{
      nId:4,
      message:"4 Hello, world! This is a toast message."
    },
    {
      nId:4,
      message:"4 Hello, world! This is a toast message."
    },
    {
      nId:4,
      message:"4 Hello, world! This is a toast message."
    },
    {
      nId:4,
      message:"4 Hello, world! This is a toast message."
    }
  ]
 countOfNotification:number=0;

 noNotification:boolean=false;

  constructor( @Inject(DOCUMENT) private document: any,
                  private router: Router,
                  private toaster : ToastrService) { }

  ngOnInit(): void {
    this.getCountOfNotification();
    this.elem = document.documentElement;
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
    this.eventObj.navPatient=true;
    this.eventObj.navMaster=false;
    this.eventObj.navSetting=false;
    this.eventObj.navAbout=false;
    this.eventObj.navContact=false;
    this.addPatientEvent.emit(this.eventObj);

  }

// Profile button all method start
    onLogoutClick() {
      this.toaster.success("Logout Successfully");
      this.router.navigate(['/login'])
    }
    onSecurityClick() {
      this.eventObj.navDashboard=false;
      this.eventObj.navHome=false;
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
        
      })

    //   this.toaster.success("Delete all?","<br /><br /><button type='button' class='btn clear'>Yes</button>",{
    //     closeButton: false,
    //     onClick: function(){
    //         var nodeData = scope.$modelValue;
    //                     if(nodeData.nodes.length > 0){
    //                         toastr.error('Cant delete Sub levels available :', 'Warning', {
    //                             closeButton: true
    //                         });
    //                     }else{
    //                         mainMenuService.deleteData(nodeData).success(function(data) {
    //                             scope.remove();
    //                             toastr.success(data.message, 'Message', {
    //                                 closeButton: true
    //                             });
    //                         }).error(function(err) {
    //                             toastr.error(err, 'Warning', {
    //                                 closeButton: true
    //                             });
    //                         });
    //                     }
    //     }
    // })
       
    }
}
