import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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


  //export patint pdf objects
  pdfurl:any;
  safepdfUrl:any

  constructor(private sanitizer: DomSanitizer,
                private userhttp:HttpClient
  ) { 
    this.safepdfUrl=sanitizer.bypassSecurityTrustResourceUrl(this.pdfurl);
  }

  ngOnInit(): void {
  }

  clickonBack(){
    this.patientPage = !this.patientPage;
  }

  onClickPateint(patient:any){
    this.patientObj = patient;
    this.patientPage = !this.patientPage;
  }



// Patients pdf export
  makePdf(){

    let pdf= new jsPDF('p','pt','a4');

    //width: 595px;
    //height: 842px;



    //  pdf.html(this.el1.nativeElement,{
    //   callback :(pdf)=>{
    //     var blob = pdf.output("blob");
    //     var usrl=window.URL.createObjectURL(blob);
    //     this.pdfurl=this.transform(usrl);
    //   },
    //   y:2,
    //   margin :22
      
    // })

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
    
