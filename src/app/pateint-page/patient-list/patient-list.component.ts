import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { PatientService } from '../service/patient.service';
import { Patient } from '../model/PatientModel';
import { PatientPage } from '../model/PatientPage';
import { PatientModalService } from '../service/patient-modal.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
   patientObj={
    patientId:0,
    patientName:null,
    gender:null,
    mobileNo:null,
    addedDate:null,
  }

  patientList:Patient[]=[];
  patientPage=<PatientPage>{};
  lId = <number> new Number(sessionStorage.getItem("labId"));

  pageNumber:number=1;
  pageSize:number=9;
  totalCount:number=0
  MaxPageNumbers:number=0;
  nameSearch:string='';


  //export patint pdf objects
  pdfurl:any;
  safepdfUrl=this.sanitizer.bypassSecurityTrustResourceUrl("");

  constructor(private sanitizer: DomSanitizer,
              private router : Router,
              private patientService:PatientService,
              private patientModalService:PatientModalService) { }

  ngOnInit(): void {
    var lId = <number> new Number(sessionStorage.getItem("labId"));
    this.patientService.getPatientListByLabId(this.lId,this.pageNumber,this.pageSize).subscribe((r)=>{
        this.patientPage = <any>r;
        this.patientList = this.patientPage.content;
        this.totalCount = this.patientPage.totalElements;
        this.pageNumber = this.patientPage.number;
        this.MaxPageNumbers = this.patientPage.totalPages;
        console.log(<any>r)
    })
  }

  openNewPatientModal(){
    this.patientModalService.onButtonClick.next(null);
  }

  changePage(event:any){
    this.pageNumber = event;
    this.patientService.getPatientListByLabId(this.lId,this.pageNumber,this.pageSize).subscribe((r)=>{
      this.patientPage = <any>r;
      this.patientList = this.patientPage.content;
      this.totalCount = this.patientPage.totalElements;
      this.pageNumber = this.patientPage.number;
      console.log(<any>r)
  })
  }

  onClickPateint(patient:any){
    this.patientObj = patient;
    this.router.navigate(["dashboard/pateint/PatientDetails",this.patientObj.patientId]);
  }


  makePdf(){

    let pdf= new jsPDF('p','pt','a4');

      pdf.line(20, 20, 575, 20, "S");
      pdf.line(20, 40, 575, 40, "S");

      let reportTableList =[
        [
          8,
          "Ganesh Sapate",
          "M",
          "9096916759",
          new Date().toLocaleString(),
          "pending"
        ]
      ]
      autoTable(pdf, {
          head: [['ID', 'Paitent Name', 'Gender','Report Date','Report List','Cost']],
          margin: { top: 20,right:20,left:20 },
          body: reportTableList,
          theme:"striped"
        })
      //pdf.save("sample.pdf");
          pdf.setProperties({
            title: "Paitent List"
        });

    pdf.setFontSize(10);
    pdf.text('Footer Text', pdf.internal.pageSize.width - 60, pdf.internal.pageSize.height - 15,{align : "center"});
    var blob = pdf.output("blob");
    var usrl=window.URL.createObjectURL(blob);
    this.pdfurl=usrl;
    this.safepdfUrl=this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfurl);
  }

  printReport(){
    window.open( this.pdfurl, "Export Data");
  }

}
