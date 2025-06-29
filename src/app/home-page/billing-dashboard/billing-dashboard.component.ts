import { Component, Input, OnInit } from '@angular/core';
import { COLORS } from 'html2canvas/dist/types/css/types/color';

@Component({
  selector: 'app-billing-dashboard',
  templateUrl: './billing-dashboard.component.html',
  styleUrls: ['./billing-dashboard.component.css']
})
export class BillingDashboardComponent implements OnInit {

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
        backgroundColor : 'rgb(158, 158, 158)',
      }
    ]
    
  }


  constructor( ) { }

  ngOnInit(): void {
  }



   
 
}

