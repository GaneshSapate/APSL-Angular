import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {


  sideNavStatus:boolean=false;

  chartOptions= {
    responsive: true,
    maintainAspectRatio: false,
  };

  @Output() sideNavHome = new EventEmitter<any>();


  constructor(private title:Title) { }

  ngOnInit(): void {
    this.title.setTitle('dashboard');
  }

  onClickToggled() {
    this.sideNavStatus = !this.sideNavStatus;
  }


}
