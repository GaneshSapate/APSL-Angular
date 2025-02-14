import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Output, EventEmitter, Inject, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MasterDataService } from '../../master-data.service';
import { ErrorObj } from '../../Model/ErrorObj';
import { LabServiceService } from 'src/app/service/lab-service.service';
import { LabObj } from 'src/app/Model/LabObj';
import { SidebarService } from 'src/app/side-nav-bar/sidebar.service';
import { PatientModalService } from 'src/app/pateint-page/service/patient-modal.service';

declare var bootstrap: any

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

  patientModalType="add";

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

  eventObj = {
    navDashboard: false,
    navHome: true,
    navPatient: false,
    navMaster: false,
    navSetting: false,
    navAbout: false,
    navContact: false,
    navEntry: false
  }

  constructor(@Inject(DOCUMENT) private document: any,
    private router: Router,
    private toaster: ToastrService,
    private masterService: MasterDataService,
    private labService: LabServiceService,
    private sideNaveService : SidebarService,
    private patientModalService:PatientModalService) { 
      this.sideNaveService.onButtonClick.subscribe(() => {
        this.autoRefresh();
      })
    }

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
    this. autoRefresh();

    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
    })   
  }

  openNewPatientModal(){
    this.patientModalService.onButtonClick.next(null);
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

  onClickToggled() {   //  this method is not use
    this.menuStatus = !this.menuStatus;
    this.sideNavToggled.emit(this.menuStatus);
  }
  onClickToggledOffcanvas() {
    this.menuStatus = !this.menuStatus;
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

  clickOnHome() {
    this.clearAll();
    this.eventObj.navHome = true;
    this.router.navigate(["dashboard/home"]).then(()=>{
      this.sideNaveService.onButtonClick.next('');
    })
  }
  clickOnEntry() {
    this.clearAll();
    this.eventObj.navEntry = true;
    this.router.navigate(["dashboard/entryList"]).then(()=>{
      this.sideNaveService.onButtonClick.next('');
    })
  }
  clickOnDashboard() {
    this.clearAll();
    this.eventObj.navDashboard = true;
    this.router.navigate(["dashboard/dashboardDetails"]).then(()=>{
      this.sideNaveService.onButtonClick.next('');
    })
  }
  clickOnPateint() {
    this.clearAll();
    this.eventObj.navPatient = true;
    this.router.navigate(["dashboard/pateint"]).then(()=>{
      this.sideNaveService.onButtonClick.next('');
    })
  }
  clickOnMaster() {
    this.clearAll();
    this.eventObj.navMaster = true;
    this.router.navigate(["dashboard/master"]).then(()=>{
      this.sideNaveService.onButtonClick.next('');
    })
  }

  clickOnSetting() {
    this.clearAll();
    this.eventObj.navSetting = true;
    this.router.navigate(["dashboard/setting"]).then(()=>{
      this.sideNaveService.onButtonClick.next('');
    })
  }
  clickOnAbout() {
    this.clearAll();
    this.eventObj.navAbout = true;
    // this.router.navigate(["dashboard/about"]);
  }
  clickOnContact() {
    this.clearAll();
    this.eventObj.navContact = true;
    // this.router.navigate(["dashboard/contact"]);
  }

  clearAll() {
    this.eventObj.navDashboard = false;
    this.eventObj.navHome = false;
    this.eventObj.navPatient = false;
    this.eventObj.navMaster = false;
    this.eventObj.navSetting = false;
    this.eventObj.navAbout = false;
    this.eventObj.navContact = false;
    this.eventObj.navEntry = false;
  }

  autoRefresh(){
    let url: string = this.router.url;
    if (url.startsWith("/dashboard/home")) {
      this.clearAll();
      this.eventObj.navHome = true;
    }
    if (url.startsWith("/dashboard/entryList")) {
      this.clearAll();
      this.eventObj.navEntry = true;
    }
    if (url.startsWith("/dashboard/dashboardDetails")) {
      this.clearAll();
      this.eventObj.navDashboard = true;
    }
    if (url.startsWith("/dashboard/pateint")) {
      this.clearAll();
      this.eventObj.navPatient = true;
    }
    if (url.startsWith("/dashboard/master")) {
      this.clearAll();
      this.eventObj.navMaster = true;
    }
    if (url.startsWith("/dashboard/setting")) {
      this.clearAll();
      this.eventObj.navSetting = true;
    }
  }
}
