import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MasterDataService } from '../master-data.service';

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
}
