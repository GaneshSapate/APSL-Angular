import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MasterDataService } from '../master-data.service';
import { LabServiceService } from '../service/lab-service.service';
import { Router } from '@angular/router';
import { LabObj } from '../Model/LabObj';
import { ErrorObj } from '../Model/ErrorObj';

@Component({
  selector: 'app-new-lab-registration',
  templateUrl: './new-lab-registration.component.html',
  styleUrls: ['./new-lab-registration.component.css']
})
export class NewLabRegistrationComponent {

  labLogoString: any;
  Base64Url: any;

  stateList = [
    {
      id: 0,
      code: "",
      discription: ""
    }
  ];
  districtList = [
    {
      id: 0,
      stateCode: "",
      discription: ""
    }
  ];

  state: string = "";
  district: string = "";

  modalTitle: String = "";
  modalModify: boolean = false;

  labObj = <LabObj>{};
  errorObj = <ErrorObj>{};
  labList = [<LabObj>{}];

  constructor(private toaster: ToastrService,
    private masterService: MasterDataService,
    private labService: LabServiceService,
    private router: Router) { }

  ngOnInit(): void {
    this.fetchStateList();
  }

  fetchStateList() {
    this.masterService.getAllState().subscribe(
      (r) => {
        this.stateList = <any>r;
      })
  }

  onSelectState() {
    this.districtList = [];
    if (this.labObj.state) {
      this.masterService.getDistrictByStateCode(this.labObj.state).subscribe(
        (result) => {
          this.districtList = <any>result;
        })
    }
  }

  _handleReaderLoaded(readerEvt: any) {
    var binaryString = readerEvt.target.result;
    this.Base64Url = btoa(binaryString);
  }

  addPictures() {
    this.labLogoString = atob(this.Base64Url);
  }

  public picked(evt: any) {
    var files = evt.target.files;
    var file = files[0];
    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsDataURL(file);
    }
  }

  pincodeValidation() {
    var num: string = "" + this.labObj.pincode;
    if (num.length > 6) {
      num = num.substring(0, 6);
      this.labObj.pincode = num;
    }
  }
  mobileNumberValidation() {
    var num: string = "" + this.labObj.mobileNumber;
    if (num.length > 10) {
      num = num.substring(0, 10);
      this.labObj.mobileNumber = num;
    }
  }

  addLab() {

    this.labObj.userId = <number>new Number(sessionStorage.getItem("mid"));
    this.labObj.mobileNumber = this.labObj.mobileNumber.toString();
    this.labObj.pincode = this.labObj.pincode.toString();
    this.labObj.labLogoString = this.labLogoString;
    this.labObj.labStatus = true;
    console.log(this.labObj);
    this.labService.addLab(this.labObj).subscribe(
      (r) => {
        let labId = <any>r;
        this.toaster.success("Laboratory Added Successfully, LabId : " + labId);
        sessionStorage.setItem("labId",labId);
        this.router.navigate(["/dashboard/home"]); 
      });
  }

}
