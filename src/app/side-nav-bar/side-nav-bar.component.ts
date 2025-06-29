import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from './sidebar.service';

declare var bootstrap: any

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.css']
})
export class SideNavBarComponent implements OnInit {

  homePage: boolean = false;
  @Input() sideNavStatus: boolean = false;

  @Output() sideNavToggled = new EventEmitter<boolean>();

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
  constructor(private router: Router,
    private sideNaveService: SidebarService) {
    this.sideNaveService.onButtonClick.subscribe(() => {
      this.ngOnInit();
    })
  }

  ngOnInit(): void {
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
  }
  clickOnContact() {
    this.clearAll();
    this.eventObj.navContact = true;
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
   onClickToggled() {
    this.sideNavStatus = !this.sideNavStatus;
    this.sideNavToggled.emit(this.sideNavStatus);
  }

}
