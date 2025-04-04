import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MasterDataService } from 'src/app/master-data.service';
import { Patient } from '../model/Patient';
import { PatientEntry } from '../model/PatientEntry';
import { DoctorServiceService } from 'src/app/service/doctor-service.service';
import { Doctor } from 'src/app/Model/Doctor';
import { TestService } from 'src/app/service/test.service';
import { TestMasterObj } from 'src/app/Model/TestMasterObj';
import { SidebarService } from 'src/app/side-nav-bar/sidebar.service';
import { PatientEntryService } from '../service/patient-entry.service';
import { PatientService } from 'src/app/pateint-page/service/patient.service';
import { PatientTestMasterObj } from '../model/PatientTestMasterObj';
import { EntryModalService } from '../service/entry-modal.service';

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
  doctorsList:Doctor[]=[];
  searchPatientList:Patient[]=[];
  testMasterList:PatientTestMasterObj[]=[];

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

  patientObj = <Patient>{};
  patientEntry = <PatientEntry>{};
  doctorObj=<Doctor>{};
  searchString:string = "";
  doctorString:string = "";

  testSearchString:string="";
  selectedTestList:TestMasterObj[]=[];

  constructor(private toaster: ToastrService,
    private router: Router,
    private masterService: MasterDataService,
    private doctorService: DoctorServiceService,
    private testService:TestService,
    private sideNaveService : SidebarService,
    private patientEntryService:PatientEntryService,
    private patientService:PatientService,
    private entryModalServie:EntryModalService) { }

  ngOnInit(): void {
    this.patientEntry.patient=<Patient>{};
    this.patientEntry.patient.title="";
    this.patientEntry.patient.gender="";
    this.patientEntry.patient.ageUnit="Y";
    this.patientEntry.patient.district="";
    this.patientEntry.patient.country="";
    this.patientEntry.doctor = <Doctor>{};
    this.masterService.getAllState().subscribe((r) => {
      this.stateList = <any>r;
    });
    this.doctorService.getAlldoctorsByLabId(this.labId).subscribe((r)=>{
      this.doctorsList=<any>r;
    })
    this.testService.getTestListByLabID(this.labId).subscribe((r)=>{
      this.testMasterList = <any>r;
    })
  }

  onSelectState() {
    this.districtList=[];
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

  addPatient() {
    let userId = <number> new Number(sessionStorage.getItem("userId"));
    this.patientEntry.addedUserId =userId;
    this.patientEntry.labId = this.labId;
    this.patientEntry.addedDate = new Date();
    this.patientEntry.status = "Pending"
    this.patientEntryService.addPatientEntry(this.patientEntry).subscribe((r)=>{
      this.patientEntry = <any>r;
      this.toaster.success("Patient Entry Added Successfully ");
      let url: string = this.router.url;
      if (url.startsWith("dashboard/entryList/entryDetails")) {
        this.router.navigate(["dashboard/entryList/entryDetails",this.patientEntry.entryId]);
        this.entryModalServie.onButtonClick.next(this.patientEntry.entryId);
        this.clearAll();
      }else{
        this.router.navigate(["dashboard/entryList/entryDetails",this.patientEntry.entryId]).then(()=>{
          this.sideNaveService.onButtonClick.next('');
          this.clearAll();
        });
      }
    })
    
  }

}
