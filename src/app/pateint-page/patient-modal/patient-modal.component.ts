import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Patient } from 'src/app/entry-page/model/Patient';
import { MasterDataService } from 'src/app/master-data.service';
import { PatientService } from '../service/patient.service';
import { Subject } from 'rxjs';
import { PatientModalService } from '../service/patient-modal.service';
import { PatientDetailsComponent } from '../patient-details/patient-details.component';
import { PatientDetailsService } from '../service/patient-details.service';

@Component({
  selector: 'app-patient-modal',
  templateUrl: './patient-modal.component.html',
  styleUrls: ['./patient-modal.component.css']
})
export class PatientModalComponent implements OnInit {



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

  @Input() patientObj:Patient = <Patient>{};

  @Input() patientObj1= {};

  @Input() modalType = "";

  @Input() pid: Subject<Patient> | undefined;
  modalTitle: string = "";

  @ViewChild('closeDoctorModel') closeUserModel: any;

  constructor(private masterService: MasterDataService,
    private toaster: ToastrService,
    private router: Router,
    private patientService: PatientService,
    private patientModalService:PatientModalService) {}

  ngOnInit(): void {
    this.masterService.getAllState().subscribe((r) => {
      this.stateList = <any>r;
    });
    this. addPatientModal();
  }

  addPatientModal() {
    this.patientObj = <Patient>{};
    this.modalTitle = " Add New Patient";
      this.patientObj.title = "";
      this.patientObj.gender = "";
      this.patientObj.district = "";
      this.patientObj.country = "";
      this.patientObj.ageUnit = "Y";
  }

  onSelectState() {
    this.districtList=[];
    if (this.patientObj.state) {
      this.masterService.getDistrictByStateCode(this.patientObj.state).subscribe(
        (result) => {
          this.districtList = <any>result;
        })
    }
  }

  addPatient() {
    this.patientObj.addedUserId = <number>new Number(sessionStorage.getItem("userId"));
    this.patientObj.labId = <number>new Number(sessionStorage.getItem("labId"));
    this.patientObj.addedDate = new Date();
    this.patientService.addPatient(this.patientObj).subscribe((r) => {
      this.toaster.success("Patient Added Successfully");
      if (this.closeUserModel) {
        this.closeUserModel.nativeElement.click();
      }
      this.router.navigate(["dashboard/pateint"]).then(()=>{
        this.patientModalService.onButtonClick.next(null);
      });
    })
  }

  closeModal(){
    this. addPatientModal();
  }

}
