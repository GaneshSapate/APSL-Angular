import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pateint-page',
  templateUrl: './pateint-page.component.html',
  styleUrls: ['./pateint-page.component.css']
})
export class PateintPageComponent implements OnInit {

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
    },
    {
      patientId:2,
      patientName:"Shivprasad Gaikwad",
      gender:"M",
      mobileNo:"9096916759",
      addedDate:new Date().toLocaleString(),
      status:"pending"
    },
    {
      patientId:3,
      patientName:"Ganesh Sapate",
      gender:"M",
      mobileNo:"9096916759",
      addedDate:new Date().toLocaleString(),
      status:"pending"
    },
    {
      patientId:4,
      patientName:"Ganesh Sapate",
      gender:"M",
      mobileNo:"9096916759",
      addedDate:new Date().toLocaleString(),
      status:"pending"
    },
    {
      patientId:5,
      patientName:"Ganesh Sapate",
      gender:"M",
      mobileNo:"9096916759",
      addedDate:new Date().toLocaleString(),
      status:"pending"
    },
    {
      patientId:6,
      patientName:"Ganesh Sapate",
      gender:"M",
      mobileNo:"9096916759",
      addedDate:new Date().toLocaleString(),
      status:"pending"
    },
    {
      patientId:7,
      patientName:"Ganesh Sapate",
      gender:"M",
      mobileNo:"9096916759",
      addedDate:new Date().toLocaleString(),
      status:"pending"
    },
    {
      patientId:8,
      patientName:"Ganesh Sapate",
      gender:"M",
      mobileNo:"9096916759",
      addedDate:new Date().toLocaleString(),
      status:"pending"
    },
    {
      patientId:9,
      patientName:"Ganesh Sapate",
      gender:"M",
      mobileNo:"9096916759",
      addedDate:new Date().toLocaleString(),
      status:"pending"
    },
    {
      patientId:10,
      patientName:"Ganesh Sapate",
      gender:"M",
      mobileNo:"9096916759",
      addedDate:new Date().toLocaleString(),
      status:"pending"
    },
    {
      patientId:11,
      patientName:"Ganesh Sapate",
      gender:"M",
      mobileNo:"9096916759",
      addedDate:new Date().toLocaleString(),
      status:"pending"
    },
    {
      patientId:12,
      patientName:"Ganesh Sapate",
      gender:"M",
      mobileNo:"9096916759",
      addedDate:new Date().toLocaleString(),
      status:"pending"
    },
    {
      patientId:13,
      patientName:"Ganesh Sapate",
      gender:"M",
      mobileNo:"9096916759",
      addedDate:new Date().toLocaleString(),
      status:"pending"
    }
  ];

  p:number=1;

  nameSearch:string='';

  constructor() { }

  ngOnInit(): void {
  }

  clickonBack(){
    this.patientPage = !this.patientPage;
  }

  onClickPateint(patient:any){
    this.patientObj = patient;
    this.patientPage = !this.patientPage;
  }

}
