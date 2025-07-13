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
import { PatientService } from 'src/app/pateint-page/service/patient.service';
import { PatientTestMasterObj } from '../model/PatientTestMasterObj';
import { ToastrService } from 'ngx-toastr';
import { EntryModalService } from '../service/entry-modal.service';
import { CheckTestMasterDTO } from '../model/CheckTestMasterTO';
import { TestTableData } from 'src/app/Model/TestTableData';
import { AngularEditorConfig } from '@kolkov/angular-editor';

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
  testMasterList: CheckTestMasterDTO[] = [];
  testMasterObj= <TestMasterObj>{};

  labId = <number> new Number(sessionStorage.getItem("labId"));

  editorConfigView : AngularEditorConfig = {
      editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: '60vh',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: 'Arial',
      defaultFontSize: '',
      sanitize: true,
      fonts: [
        { class: 'arial', name: 'Arial' },
        { class: 'times-new-roman', name: 'Times New Roman' },
        { class: 'calibri', name: 'Calibri' },
        { class: 'comic-sans-ms', name: 'Comic Sans MS' }
      ],
      toolbarHiddenButtons: [
        [],
        ['fontName', 'fontSize', 'insertVideo', 'backgroundColor', 'customClasses', 'justifyLeft', 'justifyCenter', 'heading',
          'justifyRight',
          'justifyFull',
          'indent',
          'outdent',]
      ]
    };


  constructor(private masterService: MasterDataService,
    private testService:TestService,
    private router: Router,
    private route: ActivatedRoute,
    private entryService: PatientEntryService,
    private doctorService: DoctorServiceService,
    private patientService: PatientService,
    private toaster: ToastrService,
    private entryModalServie:EntryModalService,
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
        this.testMasterList.forEach((test) =>{
            this.patientEntry.testCode.forEach((pTest)=>{
              if(test.testCode === pTest.testCode){
                test.ptmid = pTest.ptmid;
                test.selectFlag = true;
                test.existingTest = true;
              }
            });
        });
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

  modifyPatientInfo(){

  }

  modifyPatient() {
    let userId = <number> new Number(sessionStorage.getItem("userId"));
    this.patientEntry.modifiedUserId =userId;
    this.patientEntry.modifiedDate = new Date();
    this.patientEntry.testCode = [];
    if(this.patientEntry.modifyPatient){
      this.patientEntry.patient.modifiedDate = new Date();
      this.patientEntry.patient.modifiedUserId = <number> new Number(sessionStorage.getItem("userId"));
    }
    this.testMasterList.forEach((obj:CheckTestMasterDTO ) => {
      if(obj.selectFlag || obj.existingTest){
        let patientTestMasterObj1 = <PatientTestMasterObj>{};
        patientTestMasterObj1.ptmid = obj.ptmid;
        patientTestMasterObj1.testCode = obj.testCode;
        patientTestMasterObj1.testName = obj.testName;
        patientTestMasterObj1.testTextData = obj.testTextData;
        patientTestMasterObj1.selectFlag = obj.selectFlag;
        patientTestMasterObj1.existingTest = obj.existingTest;
        patientTestMasterObj1.eid = this.patientEntry.entryId;
        patientTestMasterObj1.addedDate = new Date();
        patientTestMasterObj1.addedUserId = <number> new Number(sessionStorage.getItem("userId"));
        this.patientEntry.testCode.push(patientTestMasterObj1);
      }
    });
    this.entryService.updatePatientEntry(this.patientEntry).subscribe((r)=>{
      this.entryObj = <any>r;
      this.toaster.success("Patient Entry Updated Successfully ");
      this.clearAll();
    })
  }

  openTestModal(testCode:string){
    let labId = <number> new Number(sessionStorage.getItem("labId"));
    this.testService.getTestByTestCode(testCode, labId).subscribe((r)=>{
        let newtestMasterObj = <TestMasterObj>r;
        this.testMasterObj = Object.assign({}, newtestMasterObj);
        if(this.testMasterObj.testType === 'Table'){
          this.testMasterObj.testTableDataDTOList = [];
          newtestMasterObj.testTableDataDTOList.forEach( (fieldObj: TestTableData) => {
            if(fieldObj.field_type === 'Single Field'){
              this.testMasterObj.testTableDataDTOList.push(fieldObj);
            }else if (fieldObj.field_type === 'Title Field' ){
              this.testMasterObj.testTableDataDTOList.push(fieldObj);
              fieldObj.subFieldDataList.forEach( (subfieldObj: TestTableData) =>{
                this.testMasterObj.testTableDataDTOList.push(subfieldObj);
              });
            }else{
              this.testMasterObj.testTableDataDTOList.push(fieldObj);
            }
          });
        }
        console.log(this.testMasterObj);
    });

  }
}
