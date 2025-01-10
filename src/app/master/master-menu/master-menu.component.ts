import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-master-menu',
  templateUrl: './master-menu.component.html',
  styleUrls: ['./master-menu.component.css']
})
export class MasterMenuComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  goToDocter(){
    this.router.navigate(["dashboard/master/doctersManagement"]);
  }

  goToReport(){
    this.router.navigate(['dashboard/master/reportsManagement'])
  }

  goToLab(){
    this.router.navigate(['dashboard/master/labDetailsManagement'])
  }
  goToUserManagement(){
    this.router.navigate(['dashboard/master/userManagement'])
  }

}
