import { Component, OnInit, Renderer2 } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { PatientEntryService } from '../service/patient-entry.service';
import { PatientEntry } from '../model/PatientEntry';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit {

  patientPage:boolean=true;

 patienEntrytList:PatientEntry[]=[];
 lId = <number> new Number(sessionStorage.getItem("labId"));
 
 p:number=1;
 nameSearch:string='';
 pageNumber:number=1;
 pageSize:number=9;
 totalCount:number=0
 MaxPageNumbers:number=0;

 //export patint pdf objects
 pdfurl:any;
 safepdfUrl=this.sanitizer.bypassSecurityTrustResourceUrl("");

 constructor(private sanitizer: DomSanitizer,
             private router : Router,
             private patientEntryService:PatientEntryService,
              private renderer: Renderer2) { }

             
  ngOnInit(): void {
    this.patientEntryService.getPatientEntryListByLabId(this.lId,this.pageNumber,this.pageSize).subscribe((r)=>{
      this.patienEntrytList = <any> r;
    })

    const tableContainer = document.getElementById('PatientTable');
    const tableHeader = document.getElementById('table-head');

    if (tableContainer && tableHeader) {
      tableContainer.addEventListener('scroll', () => {
        if (tableContainer.scrollTop > 0) {
          this.renderer.addClass(tableHeader, 'shadow-sm');
        } else {
          this.renderer.removeClass(tableHeader, 'shadow-sm');
        }
      });
    }
    
  }
  
 onClickPateint(entryOBJ:any){
   let entry = <PatientEntry> entryOBJ;
   this.router.navigate(["dashboard/entryList/entryDetails",entry.entryId]);
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
