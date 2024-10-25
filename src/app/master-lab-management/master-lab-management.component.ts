import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MasterDataService } from '../master-data.service';
import { LabObj } from '../Model/LabObj';
import { LabServiceService } from '../service/lab-service.service';
import { ErrorObj} from '../Model/ErrorObj'

@Component({
  selector: 'app-master-lab-management',
  templateUrl: './master-lab-management.component.html',
  styleUrls: ['./master-lab-management.component.css']
})
export class MasterLabManagementComponent implements OnInit {

  @Output() masterPageObjEmmitter = new EventEmitter<any>();
  
  masterPageObj:any={
    masterPageShow:true,
    docterManagement:false,
    reportManagement:false,
    labManagement:false
  }

  imageSrc:any;
  sellersPermitFile: any;
  DriversLicenseFile: any;
  InteriorPicFile: any;
  ExteriorPicFile: any;
  //base64s
  labLogoString: any;
  Base64Url:any;
  //json
  finalJson = {};

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
  
   state:string="";
   district:string="";

   modalTitle:String = "";
   modalModify:boolean = false;

   @ViewChild('closeLabModal') closeLabModal:any;

   labObj=<LabObj>{};
   errorObj=<ErrorObj>{};
   labList=[<LabObj>{}];

   //change status variable
   booleanValue:boolean=false;
   @ViewChild('closeStatusModal') closeStatusModal:any;

  constructor(  private toaster : ToastrService,
                private masterService: MasterDataService,
                private labService: LabServiceService) { }

  ngOnInit(): void {
    this.getAllLabs();
    this.fetchStateList();
  }

  
  clickonBack(){
    this.masterPageObj.masterPageShow =true;
    this.masterPageObj.docterManagement = false;
    this.masterPageObj.reportManagement = false;
    this.masterPageObj.labManagement = false;
    this.masterPageObjEmmitter.emit(this.masterPageObj);
  }
  getAllLabs(){
    var userId = <number> new Number(sessionStorage.getItem("mainUserId"));
    this.labService.getLabsByUserId(userId).subscribe(
      (r)=>{
        this.labList=<any>r;
      })
  }

  public picked(evt:any){
    var files = evt.target.files;
    var file = files[0];
    if (files && file) {
        var reader = new FileReader();
        reader.onload =this._handleReaderLoaded.bind(this);
        reader.readAsDataURL(file);
    }
  }
  _handleReaderLoaded(readerEvt:any) {
    var binaryString = readerEvt.target.result;
    this.Base64Url= btoa(binaryString);
  }

  addPictures() {
    this.labLogoString  =atob(this.Base64Url);
  }

  fetchStateList(){
    this.masterService.getAllState().subscribe(
      (r)=>{
        this.stateList = <any>r;
      })
  }

  onSelectState() {
    this.districtList=[];
    if(this.labObj.state ){
      this.masterService.getDistrictByStateCode(this.labObj.state).subscribe(
        (result)=>{
          this.districtList = <any> result;
      })
    }
    
  }
  addlabModal(){
    this.labObj=<LabObj>{};
    this.modalTitle = "Add New Laboratory";
    this.modalModify = false;
    this.Base64Url="";
    this.labLogoString="";
  }
  modifyLabModal(lab:any){
    this.Base64Url="";
    this.labLogoString="";
    this.modalTitle = "Modify Laboratory";
    this.modalModify = true;

    this.labService.getLabsById(lab.labId).subscribe(
      (r)=>{
        this.labObj=<any>r;
        this.onSelectState();
        this.labLogoString=this.labObj.labLogoString;
      })

  }
  pincodeValidation(){
    var num:string = ""+this.labObj.pincode;
    if(num.length>6){
      num=num.substring(0,6);
      this.labObj.pincode = num;
    }
  }
  mobileNumberValidation(){
    var num:string = ""+this.labObj.mobileNumber;
    if(num.length>10){
      num=num.substring(0,10);
      this.labObj.mobileNumber = num;
    }
  }

  submit(form:any){}

  addLab(){
    
    this.labObj.userId= <number> new Number(sessionStorage.getItem("mainUserId"));
    this.labObj.mobileNumber=this.labObj.mobileNumber.toString();
    this.labObj.pincode=this.labObj.pincode.toString();
    this.labObj.labLogoString=this.labLogoString;
    this.labObj.labStatus=true;
    console.log(this.labObj);
    this.labService.addLab(this.labObj).subscribe(
      (r)=>{
        let labId = <any>r;
        this.toaster.success("Laboratory Added Successfully, LabId : "+labId);
        this.closeLabModal.nativeElement.click();
        this.getAllLabs();
      });
  }

  updateStatusModal(lab:any){
    this.labService.getLabsById(lab.labId).subscribe(
      (r)=>{
        this.labObj=<any>r;
      },(e)=>{
        this.errorObj=<any>e;
        this.toaster.error(this.errorObj.message,"Error");
      }
    )
  }
  changeStatus(){
    this.labService.changeStatus(this.labObj.labId,this.labObj.labStatus).subscribe(
      (r)=>{
        this.errorObj=<any>r;
        this.toaster.success(this.errorObj.message,"Success");
        this.closeStatusModal.nativeElement.click();
        this.getAllLabs();
      })
  }

  modifyLab(){

    //this.labObj.userId= <number> new Number(sessionStorage.getItem("mainUserId"));
    this.labObj.mobileNumber=this.labObj.mobileNumber.toString();
    this.labObj.pincode=this.labObj.pincode.toString();
    if(this.Base64Url!=""){
      this.labObj.labLogoString=this.labLogoString;
    }
    console.log(this.labObj);
    this.labService.updateLab(this.labObj.labId,this.labObj).subscribe(
      (r)=>{
        let lab = <LabObj>{};
        lab = <any>r;
        this.toaster.success("Laboratory Updated Successfully, LabId : "+lab.labId);
        this.closeLabModal.nativeElement.click();
        this.getAllLabs();
        this.labObj=<LabObj>{};
      });

  }

}
