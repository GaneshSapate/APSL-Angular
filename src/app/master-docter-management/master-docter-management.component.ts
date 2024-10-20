import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MasterDataService } from '../master-data.service';
import { ErrorObj } from '../Model/ErrorObj';
import { Doctor } from '../Model/Doctor';

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

  stateList=[
    {
      id: 0,
      code: "",
      discription: ""
    }
   ];
   districtList=[
    {
      id: 0,
      stateCode: "",
      discription: ""
    }
   ];
   errorObj=<ErrorObj>{};

   doctorObj=<Doctor>{};

   @ViewChild('closeLabModal') closeLabModal:any;

  constructor(private toaster : ToastrService,
    private masterService: MasterDataService) { }

  ngOnInit(): void {
    this.fetchStateList();
  }

  clickonBack(){
    this.masterPageObj.masterPageShow =true;
    this.masterPageObj.docterManagement = false;
    this.masterPageObj.reportManagement = false;
    this.masterPageObj.labManagement = false;
    this.masterPageObjEmmitter.emit(this.masterPageObj);
  }

  fetchStateList(){
    this.masterService.getAllState().subscribe(
      (r)=>{
        this.stateList = <any>r;
      },(e)=>{
        this.errorObj=<any>e;
        this.toaster.error(this.errorObj.message,"Error");
      }
    )
  }

  onSelectState() {
    if(this.doctorObj.state ){
      this.masterService.getDistrictByStateCode(this.doctorObj.state).subscribe(
        (result)=>{
          this.districtList = <any> result;
      },
        (e)=>{
          this.errorObj=<any>e;
          this.toaster.error(this.errorObj.message,"Error");
        })
    }
    
  }


}
