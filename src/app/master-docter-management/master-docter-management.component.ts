import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-master-docter-management',
  templateUrl: './master-docter-management.component.html',
  styleUrls: ['./master-docter-management.component.css']
})
export class MasterDocterManagementComponent implements OnInit {

  @Output() masterPageObjEmmitter = new EventEmitter<any>();
  
  masterPageObj:any={
    masterPageShow:true,
    docterManagement:false,
    reportManagement:false,
    labManagement:false
  }

  patientList=[
    {
      patientId:1,
      patientName:"Ganesh Sapate",
      gender:"M",
      mobileNo:"9096916759",
      addedDate:new Date().toLocaleString(),
    }
  ];
  number1:number = 5420;
  number2:number = 5.56;

  p:number=1;

  constructor() { }

  ngOnInit(): void {
  }

  clickonBack(){
    this.masterPageObj.masterPageShow =true;
    this.masterPageObj.docterManagement = false;
    this.masterPageObj.reportManagement = false;
    this.masterPageObj.labManagement = false;
    this.masterPageObjEmmitter.emit(this.masterPageObj);
  }


}
