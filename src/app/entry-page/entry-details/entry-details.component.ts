import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterDataService } from 'src/app/master-data.service';
import { PatientEntryService } from '../service/patient-entry.service';
import { PatientEntry } from '../model/PatientEntry';

@Component({
  selector: 'app-entry-details',
  templateUrl: './entry-details.component.html',
  styleUrls: ['./entry-details.component.css']
})
export class EntryDetailsComponent implements OnInit {

  patientPage: boolean = true;
  entryObj=<PatientEntry>{};

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

  constructor(private masterService: MasterDataService,
    private router: Router,
    private route: ActivatedRoute,
    private entryService:PatientEntryService
  ) { }

  ngOnInit(): void {
    this.masterService.getAllState().subscribe((r) => {
      this.stateList = <any>r;
    });
    this.route.paramMap.subscribe(params => {
      let eid= params.get('eid');
      this.entryService.getPatientEntryById(eid).subscribe((r)=>{
        this.entryObj = <any>r;
      })
    })

  }

  clickonBack() {
    this.router.navigate(["dashboard/entryList"]);
  }

  onSelectState() {
    if (this.state) {
      this.masterService.getDistrictByStateCode(this.state).subscribe(
        (result) => {
          this.districtList = <any>result;
        })
    }
  }

  addPatient() {


  }

}
