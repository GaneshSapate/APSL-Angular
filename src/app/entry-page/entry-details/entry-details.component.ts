import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterDataService } from 'src/app/master-data.service';
import { PatientEntryService } from '../service/patient-entry.service';
import { PatientEntry } from '../model/PatientEntry';
import { Doctor } from 'src/app/Model/Doctor';
import { Patient } from '../model/Patient';
import { TestMasterObj } from 'src/app/Model/TestMasterObj';
import { DoctorServiceService } from 'src/app/service/doctor-service.service';
import { TestService } from 'src/app/service/test.service';
import { SidebarService } from 'src/app/side-nav-bar/sidebar.service';
import { PatientService } from 'src/app/pateint-page/service/patient.service';
import { PatientTestMasterObj } from '../model/PatientTestMasterObj';
import { ToastrService } from 'ngx-toastr';
import { EntryModalService } from '../service/entry-modal.service';

@Component({
  selector: 'app-entry-details',
  templateUrl: './entry-details.component.html',
  styleUrls: ['./entry-details.component.css']
})
export class EntryDetailsComponent implements OnInit {

  patientPage: boolean = true;
  entryObj = <PatientEntry>{};

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

  state: string = "";
  district: string = "";

  patientObj = <Patient>{};
  patientEntry = <PatientEntry>{};
  doctorObj = <Doctor>{};
  searchString: string = "";
  doctorString: string = "";

  testSearchString: string = "";
  selectedTestList: TestMasterObj[] = [];

  doctorsList: Doctor[] = [];
  searchPatientList: Patient[] = [];
  testMasterList: PatientTestMasterObj[] = [];

  labId = <number> new Number(sessionStorage.getItem("labId"));


  constructor(private masterService: MasterDataService,
    private testService:TestService,
    private router: Router,
    private route: ActivatedRoute,
    private entryService: PatientEntryService,
    private doctorService: DoctorServiceService,
    private sideNaveService: SidebarService,
    private patientService: PatientService,
    private toaster: ToastrService,
    private entryModalServie:EntryModalService
  ) { 
    this.entryModalServie.onButtonClick.subscribe((r)=>{
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.entryObj.patient = <Patient>{};
    this.patientEntry.patient = <Patient>{};

    this.entryObj.doctor = <Doctor>{};
    this.patientEntry.doctor = <Doctor>{};

    this.masterService.getAllState().subscribe((r) => {
      this.stateList = <any>r;
    });
    this.route.paramMap.subscribe(params => {
      let eid = params.get('eid');
      this.entryService.getPatientEntryById(eid).subscribe((r) => {
        this.entryObj = <any>r;
      })
    })

  }

  clickonBack() {
    this.router.navigate(["dashboard/entryList"]);
  }

  openEditEntryModal(){
    this.entryService.getPatientEntryById(this.entryObj.entryId).subscribe((r) => {
      this.patientEntry = <any>r;
      this.onSelectState();
      this.doctorService.getAlldoctorsByLabId(this.labId).subscribe((r)=>{
        this.doctorsList=<any>r;
      })
      this.testService.getTestListByLabID(this.labId).subscribe((r)=>{
        this.testMasterList = <any>r;
      })
    })
  }

  onSelectState() {
    this.districtList = [];
    if (this.patientEntry.patient.state) {
      this.masterService.getDistrictByStateCode(this.patientEntry.patient.state).subscribe(
        (result) => {
          this.districtList = <any>result;
        })
    }
  }
  search($event:any){
    if(this.searchString.length>=2){
      this.patientService.searchPatientByNameOrMRN(this.searchString).subscribe((s)=>{
        this.searchPatientList = <any>s;
      })
    }
  }
  onSelect(p:Patient){
    this.searchString = p.firstName +" "+p.lastName
    this.patientEntry.patient = p;
    this.onSelectState();
  }
  onSelectDoctor(d:Doctor){
    this.patientEntry.doctor = d;
    this.doctorString = d.title +" "+d.firstName+" "+d.lastName;
  }
  removeRefer(){
    this.patientEntry.doctor=<Doctor>{};
    this.doctorString ="";
  }
  testCheckBoxCheck(index:number){
    if(this.testMasterList[index].selectFlag){
      this.testMasterList[index].selectFlag=false;
    }else{
      this.testMasterList[index].selectFlag=true;
    }
  }
  clearAll(){
    this.searchString ="";
    this.doctorString ="";
    this.searchPatientList=[];
    this.patientEntry=<PatientEntry>{};
    this.patientEntry.patient=<Patient>{};
    this.patientEntry.patient.title="";
    this.patientEntry.patient.gender="";
    this.patientEntry.patient.ageUnit="Y";
    this.patientEntry.patient.district="";
    this.patientEntry.patient.country="";
    this.patientEntry.doctor = <Doctor>{};
    this.testMasterList.forEach((test)=>{
      test.selectFlag=false;
    })
  }
  closeModal(){
    this.clearAll();
  }

  modifyPatient() {
    let userId = <number> new Number(sessionStorage.getItem("userId"));
    this.patientEntry.modifiedUserId =userId;
    this.patientEntry.modifiedDate = new Date();
    console.log(this.patientEntry);
    this.entryService.updatePatientEntry(this.patientEntry).subscribe((r)=>{
      this.patientEntry = <any>r;
      this.toaster.success("Patient Entry Updated Successfully ");
      this.clearAll();
    })
  }
}
