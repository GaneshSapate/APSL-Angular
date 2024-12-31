import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterDataService } from 'src/app/master-data.service';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {

  patientPage:boolean=true;

  patientObj={
   patientId:0,
   patientName:null,
   gender:null,
   mobileNo:null,
   addedDate:null,
 }

 patientList=[
  {
    patientId:1,
    patientName:"Ganesh Sapate",
    gender:"M",
    mobileNo:"9096916759",
    addedDate:new Date().toLocaleString(),
    status:"pending"
  }
]
p:number=1;

nameSearch:string='';


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

  constructor( private masterService: MasterDataService,
    private router : Router,
    private route : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.masterService.getAllState().subscribe( (r) => {
      this.stateList = <any> r;
    });
    this.route.queryParams.subscribe(params => {
      this.patientObj=<any>params;
      
  });
  this.route.paramMap.subscribe(params =>{
    console.log("pid"+params.get('pid'));
    console.log("eid"+params.get('eid'));
  })

  }

  clickonBack(){
    this.router.navigate(["dashboard/pateint"]);
  }

  onSelectState() {
        if(this.state ){
          this.masterService.getDistrictByStateCode(this.state).subscribe(
            (result)=>{
              this.districtList = <any> result;
          })
        }
        
 }

 addPatient(){


}

}
