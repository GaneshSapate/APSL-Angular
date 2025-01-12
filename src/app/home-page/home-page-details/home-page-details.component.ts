import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from 'src/app/side-nav-bar/sidebar.service';

@Component({
  selector: 'app-home-page-details',
  templateUrl: './home-page-details.component.html',
  styleUrls: ['./home-page-details.component.css']
})
export class HomePageDetailsComponent implements OnInit {

  
    chartOptions= {
      responsive: true,
      maintainAspectRatio: false,
    };

  constructor(private router: Router,
      private sideNaveService: SidebarService) { }

  ngOnInit(): void {
  }

  clickOnDashboard(){
    this.router.navigate(["dashboard/dashboardDetails"]).then(()=>{
      this.sideNaveService.onButtonClick.next('');
    })
  }
  clickOnPateint(){
    this.router.navigate(["dashboard/pateint"]).then(()=>{
      this.sideNaveService.onButtonClick.next('');
    })
  }
  clickOnMaster(){
    this.router.navigate(["dashboard/master"]).then(()=>{
      this.sideNaveService.onButtonClick.next('');
    })
  }


}
