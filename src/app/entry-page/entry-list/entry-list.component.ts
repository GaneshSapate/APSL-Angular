import { Component, OnInit, Renderer2 } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { PatientEntryService } from '../service/patient-entry.service';
import { PatientEntry } from '../model/PatientEntry';
import { EntryFilterDTO } from '../model/EntryFilterDTO';
import { Doctor } from 'src/app/Model/Doctor';
import { DoctorServiceService } from 'src/app/service/doctor-service.service';
import { ReferModel } from '../model/ReferModel';

declare var bootstrap: any

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
  noEntryFoundFlag = false;
  entryFilterDTO=<EntryFilterDTO>{};

  statusList = [
    {
      status : 'Completed',
      check : false
    },{
      status : 'Pending',
      check : false
    },{
      status : 'Error',
      check : false
    }
  ];

  genderList = [
    {
      gender : 'Female',
      check : false
    },{
      gender : 'Male',
      check : false
    },{
      gender : 'Other',
      check : false
    }
  ];

  referList:ReferModel[]=[];

  //export patint pdf objects
  pdfurl:any;
  safepdfUrl=this.sanitizer.bypassSecurityTrustResourceUrl("");

  constructor(private sanitizer: DomSanitizer,
              private router : Router,
              private patientEntryService:PatientEntryService,
              private doctorService: DoctorServiceService,
                private renderer: Renderer2) { }

             
  ngOnInit(): void {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
    });
    var collapseElementList = [].slice.call(document.querySelectorAll('.filter-collapse'))
    var collapseList = collapseElementList.map(function (collapseEl) {
      return new bootstrap.Collapse(collapseEl)
    });

    this.onClickAddedDesc();
    this.getAllDoctorByLabId();
    this.getEntryList();
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

  getAllDoctorByLabId(){
    var labId = <number> new Number(sessionStorage.getItem("labId"));
    this.doctorService.getAlldoctorsByLabId(labId).subscribe(
      (r)=>{
        let doctorsList = <Doctor[]> r;
        for(let doc of doctorsList){
          let docter = {
            refer : doc,
            check : false
          }
          this.referList.push(docter);
        }
      })
  }
  
  onClickPateint(entryOBJ:any){
    let entry = <PatientEntry> entryOBJ;
    this.router.navigate(["dashboard/entryList/entryDetails",entry.entryId]);
  }
 
  getEntryList(){
    this.noEntryFoundFlag = false;
    this.patienEntrytList = [];
    this.patientEntryService.getPatientEntryListByLabId(this.lId,this.pageNumber,this.pageSize,this.entryFilterDTO).subscribe((r)=>{
      this.patienEntrytList = <any> r;
      if(this.patienEntrytList.length == 0){
        this.noEntryFoundFlag = true;
      }
    })
  }
  onClickAddedDesc() {
    this.entryFilterDTO.sortBy = 'added_date';
    this.entryFilterDTO.sortMethod = 'desc';
    this.getEntryList();
  }
  onClickAddedAsc(){
    this.entryFilterDTO.sortBy = 'added_date';
    this.entryFilterDTO.sortMethod = 'asc';
    this.getEntryList();
  }
  
  onClickNameDesc() {
    this.entryFilterDTO.sortBy = 'first_name';
    this.entryFilterDTO.sortMethod = 'desc';
    this.getEntryList();
  }
  
  onClickNameAsc() {
    this.entryFilterDTO.sortBy = 'first_name';
    this.entryFilterDTO.sortMethod = 'asc';
    this.getEntryList();
  }
  
  checkStatus(event: any,status:any) {
    if(event.target.checked){
      status.check = true;
    }else{
      status.check = false;
    }
  }
  checkGender(event:any,gender:any){
    if(event.target.checked){
      gender.check = true;
    }else{
      gender.check = false;
    }
  }
  checkRefer(event:any,refer:any){
    if(event.target.checked){
      refer.check = true;
    }else{
      refer.check = false;
    }
  }

  clearFilter(){
      this.statusList = [
      {
        status : 'Completed',
        check : false
      },{
        status : 'Pending',
        check : false
      },{
        status : 'Error',
        check : false
      }
    ];

    this.genderList = [
      {
        gender : 'Female',
        check : false
      },{
        gender : 'Male',
        check : false
      },{
        gender : 'Other',
        check : false
      }
    ];

    this.referList=[];
    this.getAllDoctorByLabId();
    this.entryFilterDTO.statusList = [];
    this.entryFilterDTO.genderList = [];
    this.entryFilterDTO.doctorsIdList = [];
    this.getEntryList();
  }

  applyFilter(){
    this.entryFilterDTO.statusList = [];
    this.statusList.forEach((element) => {
      if(element.check){
        this.entryFilterDTO.statusList.push(element.status);
      }
    });
    this.entryFilterDTO.genderList = [];
    this.genderList.forEach((element) => {
      if(element.check){
        if( element.gender === 'Male'){
          this.entryFilterDTO.genderList.push('M');
        }if( element.gender === 'Female'){
          this.entryFilterDTO.genderList.push('F');
        }else{
          this.entryFilterDTO.genderList.push('O');
        }
      }
    });
    this.entryFilterDTO.doctorsIdList = [];
    this.referList.forEach((element) => {
      if(element.check){
      this.entryFilterDTO.doctorsIdList.push(element.refer.doctorId);
      }
    });
    this.getEntryList();
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
