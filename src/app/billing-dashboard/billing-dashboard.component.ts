import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-billing-dashboard',
  templateUrl: './billing-dashboard.component.html',
  styleUrls: ['./billing-dashboard.component.css']
})
export class BillingDashboardComponent implements OnInit {



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

  barChartData={
    labels : ["Jan","Feb","March","April","May","Jun","July","Aug","Sept","Oct","Nov","Dec"],
    datasets:[
      {
        data:[320,330,440,660,770,680,550,440,552,660,772,555],
        label : 'Number of patient in 2024',
        barThickness:15,
        backgroundColor : 'rgb(0, 204, 177)',
      }
    ]
    
  }


  constructor( ) { }

  ngOnInit(): void {
  }



   
 
}

