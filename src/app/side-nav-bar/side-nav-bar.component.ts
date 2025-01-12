import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.css']
})
export class SideNavBarComponent implements OnInit {

  homePage: boolean = false;
  @Input() sideNavStatus: boolean = true;

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
      console.log("side nave called")
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
    this.router.navigate(["dashboard/home"]);
  }
  clickOnEntry() {
    this.clearAll();
    this.eventObj.navEntry = true;
    this.router.navigate(["dashboard/entryList"]);
  }
  clickOnDashboard() {
    this.clearAll();
    this.eventObj.navDashboard = true;
    this.router.navigate(["dashboard/dashboardDetails"]);
  }
  clickOnPateint() {
    this.clearAll();
    this.eventObj.navPatient = true;
    this.router.navigate(["dashboard/pateint"]);
  }
  clickOnMaster() {
    this.clearAll();
    this.eventObj.navMaster = true;
    this.router.navigate(["dashboard/master"]);
  }

  clickOnSetting() {
    this.clearAll();
    this.eventObj.navSetting = true;
    this.router.navigate(["dashboard/setting"]);
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

}
