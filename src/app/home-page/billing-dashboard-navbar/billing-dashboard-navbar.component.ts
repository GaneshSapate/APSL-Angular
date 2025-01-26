import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Output, EventEmitter, Inject, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MasterDataService } from '../../master-data.service';
import { ErrorObj } from '../../Model/ErrorObj';
import { LabServiceService } from 'src/app/service/lab-service.service';
import { LabObj } from 'src/app/Model/LabObj';
import { SidebarService } from 'src/app/side-nav-bar/sidebar.service';

@Component({
  selector: 'app-billing-dashboard-navbar',
  templateUrl: './billing-dashboard-navbar.component.html',
  styleUrls: ['./billing-dashboard-navbar.component.css']
})
export class BillingDashboardNavbarComponent implements OnInit {

  Flag: string = 'light';

  theme:any;
  

  mode: any = this.document.querySelector('html')?.getAttributeNode('data-bs-theme')

  @Output() sideNavToggled = new EventEmitter<boolean>();
  menuStatus: boolean = false;

  //full screen button variables
  fullScreenFlag: boolean = false;
  elem: any;
  notification = [
    {
      nId: 1,
      message: "1 Hello, world! This is a toast message."
    }
  ]
  countOfNotification: number = 0;

  noNotification: boolean = false;

  stateList = [
    {
      id: 0,
      code: "",
      discription: ""
    }
  ];
  districtList = [
    {
      id: 0,
      stateCode: "",
      discription: ""
    }
  ];

  state: string = "";
  district: string = "";
  lab = <LabObj>{};
  error = <ErrorObj>{};
  constructor(@Inject(DOCUMENT) private document: any,
    private router: Router,
    private toaster: ToastrService,
    private masterService: MasterDataService,
    private labService: LabServiceService,private sideNaveService : SidebarService) { }

  ngOnInit(): void {
    this.getCountOfNotification();
    this.elem = document.documentElement;
    this.masterService.getAllState().subscribe((r) => {
      this.stateList = <any>r;
    });
    this.theme=localStorage.getItem("theme");
    this.Flag=''+this.theme;
    if(this.theme === 'system'){
      this.useThemeDetector();
    }else if(this.theme === 'light'){
      this.mode.value = 'light';
    }else if(this.theme === 'dark'){
      this.mode.value = 'dark';
    }
    else{
      this.mode.value = 'light';
      this.theme='light'
      this.Flag='light';
    }
    
    this.setlab();
  }

  lightMode() {
    this.mode.value = 'light';
    this.Flag='light';
    localStorage.setItem("theme",'light')
    this.theme='light';
  }
  darkMode() {
    this.mode.value = 'dark';
    this.Flag='dark';
    localStorage.setItem("theme",'dark');
    this.theme='dark';
  }
  systemMode(){
    this.useThemeDetector();
    localStorage.setItem("theme",'system');
    this.theme='system';
  }

  useThemeDetector() {
    const value = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (value) {
      this.mode.value = 'dark';
      this.Flag='dark';
    }else{
      this.mode.value = 'light';
      this.Flag='light';
    }
  }

  setlab() {
    
    if(new Number(sessionStorage.getItem("labId")) && new Number(sessionStorage.getItem("labId")) !=0){
      let labId = <number>new Number(sessionStorage.getItem("labId"));
      this.labService.getLabsById(labId).subscribe(
        (r) => {
          this.lab = <any>r;
        })
    }else{
      this.router.navigate(['/selectLab']);
    }
    
  }

  onClickToggled() {
    this.menuStatus = !this.menuStatus;
    this.sideNavToggled.emit(this.menuStatus);
  }

  getCountOfNotification() {
    this.countOfNotification = this.notification.length;
    if (this.countOfNotification == 0) {
      this.noNotification = true;
    }
  }

  closeNotification(obj: number) {
    this.notification.splice(obj, 1);
    this.getCountOfNotification();
  }

  clearAllNotification() {
    this.notification.splice(0, this.notification.length);
    this.getCountOfNotification();
  }

  menuToggle() {
    const toggleMenu = document.querySelector(".menu");
    if (toggleMenu != null) {
      toggleMenu.classList.toggle("active");
    }

  }

  openFullscreen() {
    this.fullScreenFlag = !this.fullScreenFlag;
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
    this.fullScreenFlag = !this.fullScreenFlag;
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

  // Profile button all method start
  onLogoutClick() {
    this.toaster.info("Logout Successfully","");
    this.router.navigate(['/login']).then(()=>{
      sessionStorage.clear();
    });
  }
  onSecurityClick() {
    this.router.navigate(["dashboard/setting"]).then(()=>{
      this.sideNaveService.onButtonClick.next('');
    })
  }
  onSettingClick() {
    this.router.navigate(["dashboard/setting"]).then(()=>{
      this.sideNaveService.onButtonClick.next('');
    })
  }
  onProfileClick() {
    this.router.navigate(["dashboard/setting"]).then(()=>{
      this.sideNaveService.onButtonClick.next('');
    })
  }
  // Profile button all method end

  showtoast() {
    this.toaster.info("<br><button type='button' class='btn clear'>Yes</button>", "Delete all?", {
      timeOut: 3000,
      progressBar: true,
      positionClass: 'toast-top-center',
      closeButton: true,
      enableHtml: true,
      tapToDismiss: false,
      toastClass: 'ngx-toastr',

    });
  }
  onSelectState() {
    if (this.state) {
      this.masterService.getDistrictByStateCode(this.state).subscribe(
        (result) => {
          this.districtList = <any>result;
        })
    }

  }
}
