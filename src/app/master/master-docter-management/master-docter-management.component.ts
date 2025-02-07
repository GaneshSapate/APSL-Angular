import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MasterDataService } from '../../master-data.service';
import { ErrorObj } from '../../Model/ErrorObj';
import { Doctor } from '../../Model/Doctor';
import { DoctorServiceService } from '../../service/doctor-service.service';
import { Router } from '@angular/router';

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

  deleteDocterId=0;
  @ViewChild('OptionModal') OptionModal:any;

  constructor(private toaster : ToastrService,
    private masterService: MasterDataService,
    private doctorService: DoctorServiceService,
    private router:Router) { }

  ngOnInit(): void {
    this.fetchStateList();
    this.fetchDoctors();

  }
  fetchDoctors(){
    var labId = <number> new Number(sessionStorage.getItem("labId"));
    this.doctorService.getAlldoctorsByLabId(labId).subscribe(
      (r)=>{
        this.doctorsList = <any> r;
      })
  }

  clickonBack(){
    this.router.navigate(['dashboard/master'])
  }

  fetchStateList(){
    this.masterService.getAllState().subscribe(
      (r)=>{
        this.stateList = <any>r;
      })
  }

  onSelectState() {
    this.districtList=[];
    if(this.doctorObj.state ){
      this.masterService.getDistrictByStateCode(this.doctorObj.state).subscribe(
        (result)=>{
          this.districtList = <any> result;
          this.doctorObj.district=this.doctorObj.district;
      })
    }
    
  }

  addDoctorModal(){
    this.modalHeader="Add New Doctor";
    this.modalType="Add";
    this.doctorObj=<Doctor>{};
    this.doctorObj.title="";
    this.doctorObj.country="";
    this.doctorObj.state="";
    this.doctorObj.district="";
    this.doctorObj.gender="";
  }
  addDoctor(){
    var labId = <number> new Number(sessionStorage.getItem("labId"));
    var mainUserId = <number> new Number(sessionStorage.getItem("mid"));
    var userId = <number> new Number(sessionStorage.getItem("userId"));
    this.doctorObj.labId=labId;
    this.doctorObj.userId=mainUserId;
    this.doctorObj.addedBy=userId;
    console.log(this.doctorObj);
    this.doctorService.addDoctor(this.doctorObj).subscribe(
      (r)=>{
        this.doctorObj=<any>r;
        this.toaster.success("Doctor Added successfully");
        this.closeLabModal.nativeElement.click();
        this.fetchDoctors();
      })
  }

  viewDoctor(docterId:number){
    this.doctorObj=<Doctor>{};
    this.doctorService.getDoctorsById(docterId).subscribe(
      (r)=>{
        this.doctorObj = <any>r;
        if(!this.doctorObj.disableFlag){
          this.doctorObj.status="Enable";
        }else{
          this.doctorObj.status="Disable";
        }
        this.onSelectState();
      })
  }

  modifyDoctorModal( docterId:number){
    this.modalHeader="Modify Doctor";
    this.modalType="Modify";
    this.doctorObj=<Doctor>{};
    this.doctorService.getDoctorsById(docterId).subscribe(
      (r)=>{
        this.doctorObj = <any>r;
        if(!this.doctorObj.disableFlag){
          this.doctorObj.status="Enable";
        }else{
          this.doctorObj.status="Disable";
        }
        this.onSelectState();
      })
  }

  modifyDoctor(){
    if(this.doctorObj.status==="Disable"){
      this.doctorObj.disableFlag=true;
    }else{
      this.doctorObj.disableFlag=false;
    }
    this.doctorService.modifyDoctor(this.doctorObj).subscribe(
      (r)=>{
        this.doctorObj=<any>r;
        this.toaster.success("Doctor Modified successfully");
        this.closeLabModal.nativeElement.click();
        this.fetchDoctors();
      })
  }

  deleteDoctor(){
    this.doctorService.deleteDoctor(this.deleteDocterId).subscribe(
      (r)=>{
        this.doctorObj=<any>r;
        this.toaster.success("Doctor Deleted successfully");
        this.OptionModal.nativeElement.click();
        this.fetchDoctors();
      })
  }

  deleteModal(docterId:number){
    this.deleteDocterId=docterId;
  }



}
