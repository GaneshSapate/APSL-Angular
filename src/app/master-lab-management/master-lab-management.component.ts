import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MasterDataService } from '../master-data.service';
import { LabObj } from '../Model/LabObj';

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

   labObj=<LabObj>{};

  constructor(  private toaster : ToastrService,
                private masterService: MasterDataService) { }

  ngOnInit(): void {
  }

  
  clickonBack(){
    this.masterPageObj.masterPageShow =true;
    this.masterPageObj.docterManagement = false;
    this.masterPageObj.reportManagement = false;
    this.masterPageObj.labManagement = false;
    this.masterPageObjEmmitter.emit(this.masterPageObj);
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

  onSelectState() {
    if(this.state ){
      this.masterService.getDistrictByStateCode(this.state).subscribe(
        (result)=>{
          this.districtList = <any> result;
      },
        (error)=>{
          this.toaster.error(error,"Error");
        })
    }
    
  }
  addlabModal(){
    this.modalTitle = "Add New Laboratory";
    this.modalModify = false;
  }
  modifyLabModal(){
    this.modalTitle = "Modify Laboratory";
    this.modalModify = true;
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

  submit(form:any){
    if(!this.modalModify){
      console.log("new Lab :"+form);
    }
  }

}
