import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MasterDataService } from '../master-data.service';
import { ErrorObj } from '../Model/ErrorObj';
import { Doctor } from '../Model/Doctor';
import { DoctorServiceService } from '../service/doctor-service.service';

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

  doctorsList=[<Doctor>{}];
  doctorObj=<Doctor>{};

  p:number=1;

  stateList=[{id: 0,code: "",discription: ""}];
  districtList=[{id: 0,stateCode: "",discription: ""}];
  errorObj=<ErrorObj>{};

  modalHeader:string="";
  modalType:string="";

  @ViewChild('closeLabModal') closeLabModal:any;

  constructor(private toaster : ToastrService,
    private masterService: MasterDataService,
    private doctorService: DoctorServiceService) { }

  ngOnInit(): void {
    this.fetchStateList();
    this.fetchDoctors();

  }
  fetchDoctors(){
    var labId = <number> new Number(sessionStorage.getItem("labId"));
    this.doctorService.getAlldoctorsByLabId(labId).subscribe(
      (r)=>{
        this.doctorsList = <any> r;
      },(e)=>{
        this.errorObj=<any>e;
        this.toaster.error(this.errorObj.message,"Error");
      }
    )
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

  addDoctorModal(){
    this.modalHeader="Add New Doctor";
    this.modalType="Add";
    this.doctorObj=<Doctor>{};
    this.doctorObj.title="";
    this.doctorObj.country="";
    this.doctorObj.district="";
    this.doctorObj.gender="";
  }
  addDoctor(){
    var labId = <number> new Number(sessionStorage.getItem("labId"));
    var mainUserId = <number> new Number(sessionStorage.getItem("mainUserId"));
    var userId = <number> new Number(sessionStorage.getItem("userId"));
    this.doctorObj.labId=labId;
    this.doctorObj.userId=mainUserId;
    this.doctorObj.addedBy=userId;
    this.doctorService.addDoctor(this.doctorObj).subscribe(
      (r)=>{
        this.doctorObj=<any>r;
        this.toaster.success("Doctor Added successfully");
        this.closeLabModal.nativeElement.click();
        this.fetchDoctors();
      },(e)=>{
        this.errorObj=<any>e;
        this.toaster.error(this.errorObj.message,"Error");
      })
  }



}
