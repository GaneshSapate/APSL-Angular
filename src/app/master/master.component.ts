import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class MasterComponent implements OnInit {

  // Master Page Routing Variables
  // End Of Masters Routing Variables
  masterPageObj:any={
    masterPageShow:true,
    docterManagement:false,
    reportManagement:false,
    labManagement:false
  }

  constructor() { }

  ngOnInit(): void {
  }

  goToDocter(){
    this.masterPageObj.masterPageShow =false;
    this.masterPageObj.docterManagement = true;
    this.masterPageObj.labManagement = false;
    this.masterPageObj.reportManagement = false;
  }

  goToReport(){
    this.masterPageObj.masterPageShow =false;
    this.masterPageObj.reportManagement = true;
    this.masterPageObj.labManagement = false;
    this.masterPageObj.docterManagement = false;
  }

  goToLab(){
    this.masterPageObj.masterPageShow =false;
    this.masterPageObj.labManagement = true;
    this.masterPageObj.reportManagement = false;
    this.masterPageObj.docterManagement = false;
  }

  clickonBack(){
    this.masterPageObj.masterPageShow =true;
    this.masterPageObj.docterManagement = false;
    this.masterPageObj.reportManagement = false;
    this.masterPageObj.labManagement = false;
  }





}
