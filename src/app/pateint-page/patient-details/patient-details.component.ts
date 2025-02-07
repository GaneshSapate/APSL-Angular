import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterDataService } from 'src/app/master-data.service';
import { PatientService } from '../service/patient.service';
import { Patient } from '../model/PatientModel';
import { PatientModalComponent } from '../patient-modal/patient-modal.component';
import { Subject } from 'rxjs';
import { PatientModalService } from '../service/patient-modal.service';
import { PatientDetailsService } from '../service/patient-details.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {

  patientPage: boolean = true;

  patientObj = <Patient>{};

  patientModalType:string="Modify";

  patientList = [
    {
      patientId: 1,
      patientName: "Ganesh Sapate",
      gender: "M",
      mobileNo: "9096916759",
      addedDate: new Date().toLocaleString(),
      status: "pending"
    }
  ]
  p: number = 1;
  nameSearch: string = '';

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

  modalTitle: string = "";
  @ViewChild('closemodifyPatientModal') closerModel: any;

  constructor(private masterService: MasterDataService,
    private router: Router,
    private route: ActivatedRoute,
    private toaster: ToastrService,
    private patientService:PatientService) {}

  ngOnInit(): void {
    this.masterService.getAllState().subscribe((r) => {
      this.stateList = <any>r;
    });
    this.route.paramMap.subscribe(params => {
      let pId =params.get('pid');
      this.patientService.getPatientById(pId).subscribe((r)=>{
        this.patientObj = <Patient>r;
      })
    })
  }

  clickonBack() {
    this.router.navigate(["dashboard/pateint"]);
  }

  onSelectState() {
    this.districtList = [];
    if (this.patientObj.state) {
      this.masterService.getDistrictByStateCode(this.patientObj.state).subscribe(
        (result) => {
          this.districtList = <any>result;
        })
    }

  }

  openPatientModal() {
    this.modalTitle = " Modify Patient";
    this.patientService.getPatientById(this.patientObj.patientId).subscribe((r) => {
          this.patientObj = <Patient>r;
          this.onSelectState();
        })
  }

   modifyPatient() {
      this.patientObj.modifiedDate =new Date();
      this.patientService.updatePatient(this.patientObj).subscribe((r)=>{
        let patient = <Patient>r;
        this.toaster.success("Patient "+patient.patientId+" updated successfully");
        if (this.closerModel) {
          this.closerModel.nativeElement.click();
        }
      })
    }

}
