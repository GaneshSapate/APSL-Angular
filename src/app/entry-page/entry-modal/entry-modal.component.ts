import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MasterDataService } from 'src/app/master-data.service';
import { Patient } from '../model/Patient';
import { PatientEntry } from '../model/PatientEntry';
import { DoctorServiceService } from 'src/app/service/doctor-service.service';
import { Doctor } from 'src/app/Model/Doctor';
import { TestService } from 'src/app/service/test.service';
import { TestMasterObj } from 'src/app/Model/TestMasterObj';

@Component({
  selector: 'app-entry-modal',
  templateUrl: './entry-modal.component.html',
  styleUrls: ['./entry-modal.component.css']
})
export class EntryModalComponent implements OnInit {

  labId = <number> new Number(sessionStorage.getItem("labId"));
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
  doctorsList=[<Doctor>{}];

  testMasterList=[<TestMasterObj>{}];

  eventObj = {
    navPatient: false,
    navHome: false,
    navDashboard: false,
    navMaster: false,
    navSetting: false,
    navAbout: false,
    navContact: false,
    navEntry: false
  }

  @Output() addPatientEvent = new EventEmitter<any>();

  patientObj = <Patient>{};
  patientEntry = <PatientEntry>{};

  constructor(private toaster: ToastrService,
    private router: Router,
    private masterService: MasterDataService,
    private doctorService: DoctorServiceService,
    private testService:TestService) { }

  ngOnInit(): void {
    this.masterService.getAllState().subscribe((r) => {
      this.stateList = <any>r;
    });
    this.doctorService.getAlldoctorsByLabId(this.labId).subscribe((r)=>{
      this.doctorsList=<any>r;
    })

  }

  onSelectState() {
    if (this.patientObj.state) {
      this.masterService.getDistrictByStateCode(this.patientObj.state).subscribe(
        (result) => {
          this.districtList = <any>result;
        })
    }

  }

  addPatient() {


    //call this in subscribe

    this.eventObj.navDashboard = false;
    this.eventObj.navHome = false;
    this.eventObj.navEntry = true
    this.eventObj.navPatient = false;
    this.eventObj.navMaster = false;
    this.eventObj.navSetting = false;
    this.eventObj.navAbout = false;
    this.eventObj.navContact = false;
    this.addPatientEvent.emit(this.eventObj);
    this.router.navigate(["dashboard/pateint"]);
  }

}
