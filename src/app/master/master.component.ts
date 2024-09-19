import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import {animate, state, style, transition, trigger} from '@angular/animations';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class MasterComponent implements OnInit {

  // Master Page Routing Variables
  // End Of Masters Routing Variables
  masterPageObj:any={
    masterPageShow:true,
    docterManagement:false,
    reportManagement:false,
    labManagement:false
  }

  // Report Managment Variables

  //test details variabls
  department:string="";
  test_name:string="";
  test_gender:string="";
  test_code:string="";
  test_cost:string="";
  sample_type:string="";
  test_remark:string="";
  test_type:string="";

  //text editor variable
  textContent:string="";

  //test table variables
  field_type:string="Single Field";
  title_field:string="";
  title_field_of_subfield:string="";
  field_name:string="";
  data_type:string="numeric";
  unit:string="";
  range:string="";
  range_to:string="";
  opertaion:string="";
  operation_value:string="";
  apply_formula:string="N";
  formula:string="";

  selected_options:any=[];


  title_field_list:any=[];
  field_name_list:any=[];
  allTestList:any=[];

  selected:number=-1;
  modifyRow:boolean=false;
  indexForModify:number=-1;

  expanded: {[key: string]: boolean} = {};

  subfieldTableFlag:boolean=false;
  subFieldTitleIdex:number=-1
  sub_fiels_list:any=[];
  subFieldSelected:number=-1;

  testObj:any={
    department:"",
    test_name:"",
    test_gender:"",
    test_code:"",
    test_cost:"",
    sample_type:"",
    test_type:"",
    test_remark:""
  }

  testContentList:any=[];

  @ViewChild('pdfContent',{static:false}) el!:ElementRef;

  reportPdfList:any=[];
  spaceForSubfieldInReoprt:string="    ";
  pdfurl:any;

  title:string="";

  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: 'Arial',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      [''],
      ['fontSize']
    ]
};

 // End Of Report Managment Variables

 

//  Patient Management Variables
  patientList=[
    {
      patientId:1,
      patientName:"Ganesh Sapate",
      gender:"M",
      mobileNo:"9096916759",
      addedDate:new Date().toLocaleString(),
    }
  ];

  number1:number = 5420;
  number2:number = 5.56;

  p:number=1;


  constructor( private toaster : ToastrService,
                  private sanitizer: DomSanitizer) { 

                    this.pdfurl=sanitizer.bypassSecurityTrustResourceUrl(this.pdfurl);
                  }

  ngOnInit(): void {
  }

  goToDocter(){
    this.masterPageObj.masterPageShow =false;
    this.masterPageObj.docterManagement = true;
    this.masterPageObj.labManagement = false;
    this.masterPageObj.reportManagement = false;
  }

  goToReport(){
    this.masterPageObj.masterPageShow =false;
    this.masterPageObj.reportManagement = true;
    this.masterPageObj.labManagement = false;
    this.masterPageObj.docterManagement = false;
  }

  goToLab(){
    this.masterPageObj.masterPageShow =false;
    this.masterPageObj.labManagement = true;
    this.masterPageObj.reportManagement = false;
    this.masterPageObj.docterManagement = false;
  }

  clickonBack(){
    this.masterPageObj.masterPageShow =true;
    this.masterPageObj.docterManagement = false;
    this.masterPageObj.reportManagement = false;
    this.masterPageObj.labManagement = false;
  }




  // Add new reports methods start
  addCustom(selectOptions:string){
    if(selectOptions!=''){
      this.selected_options.push(selectOptions);
    }else{
      alert("please select options");
    }
   
  }
  removefromlistOfOptopns(item:number){
    this.selected_options.splice(item,1);
  }

  addFieldInFormula(selectedField:string){
    this.formula=this.formula+""+selectedField;
  }

  addRowInTestTable(){

    let testContentObj={
      test_code:"",
      sr_no:0,
      field_type:"",
      field_name:"",
      sub_field:"",
      data_type:"",
      unit:"",
      range:"",
      range_to:"",
      opertaion:"",
      operation_value:"",
      selected_options:[],
      apply_formula:"",
      formula:"",
      sub_fiels_list:[]
    }
    if(this.field_type == 'Single Field'){

      if(this.field_name!="" && this.data_type!="" ){
        var b=false;
        testContentObj.field_name=this.field_name;
        this.testContentList.forEach(function (value:any) {
            if(value.field_name == testContentObj.field_name || value.sub_field == testContentObj.field_name){
              b=true;
            }
            if(value.data_type==""){
              value.sub_fiels_list.forEach(function (subVanlue:any){
                if( subVanlue.field_name == testContentObj.field_name || subVanlue.sub_field == testContentObj.field_name){
                  b=true;
                }
              });
            }
          });

          if(b){
            this.toaster.warning("Field Name should not be same with other Field name or Sub-field name!");
          }
          else{
            testContentObj.test_code=this.test_code;
            testContentObj.field_type=this.field_type;
            testContentObj.data_type=this.data_type;
    
            if(this.data_type == 'numeric'){
              testContentObj.unit=this.unit;
              testContentObj.range=this.range;
              testContentObj.range_to=this.range_to;
            }
            if(this.data_type == 'numeric unbound'){
              testContentObj.unit=this.unit;
              testContentObj.opertaion=this.opertaion;
              testContentObj.operation_value=this.operation_value;
            }
            if(this.data_type == 'custom'){
              testContentObj.unit=this.unit;
              testContentObj.selected_options=this.selected_options;
              testContentObj.unit=this.unit;
              testContentObj.range=this.range;
            }
            if(this.data_type == 'text' || this.data_type =="multiple ranges"){
              testContentObj.unit=this.unit;
              testContentObj.range=this.range;
            }
    
            testContentObj.apply_formula=this.apply_formula;
            testContentObj.formula=this.formula;
            
            this.testContentList.push(testContentObj);
            if(this.data_type == 'numeric'){
              this.field_name_list.push(this.field_name);
            }
            this.toaster.success("Record Added Successfully");
            this.resetContentField();
          }
      }else{
        // alert("Please Select Mandatory Field!")
        this.toaster.warning("Please Select Mandatory Field!");
      }



    }

    if(this.field_type == 'Title Field'){

      if(this.title_field!="" ){
        var b=false;
        testContentObj.test_code=this.test_code;
        testContentObj.field_type=this.field_type;
        testContentObj.field_name=this.title_field;

        this.testContentList.forEach(function (value:any) {
          if( value.field_name == testContentObj.field_name || value.sub_field == testContentObj.field_name){
            b=true;
          }
          if(value.data_type==""){
            value.sub_fiels_list.forEach(function (subVanlue:any){
              if( subVanlue.field_name == testContentObj.field_name || subVanlue.sub_field == testContentObj.field_name){
                b=true;
              }
            });
          }
          
        });
        if(b){
          this.toaster.warning("Title Name should not be same with other Field name or Sub-field name!");
        }else{
          this.testContentList.push(testContentObj);
          this.title_field_list.push(this.title_field);
          this.toaster.success("Title Added Successfully");
          this.resetContentField();
        }
      }else{
        // alert("Please Select Mandatory Field!")
        this.toaster.warning("Please Select Mandatory Field!");
      }
    }

    if(this.field_type == 'Sub Field'){

      if(this.field_name!="" && this.data_type!="" && this.title_field_of_subfield != ""){

        var b=false;
        testContentObj.field_name=this.title_field_of_subfield;
        testContentObj.sub_field=this.field_name;
        this.testContentList.forEach(function (value:any) {
            if( value.field_name == testContentObj.sub_field || value.sub_field == testContentObj.sub_field){
              b=true;
            }
            if(value.data_type==""){
              value.sub_fiels_list.forEach(function (subVanlue:any){
                if( subVanlue.sub_field == testContentObj.field_name){
                  b=true;
                }
              });
            }
          });

          if(b){
            this.toaster.warning("Sub-Field Name should not be same with other Field name or Sub-field name!");
          }else{
 
              testContentObj.test_code=this.test_code;
              testContentObj.field_type=this.field_type;
              testContentObj.data_type=this.data_type;
      
              if(this.data_type == 'numeric'){
                testContentObj.unit=this.unit;
                testContentObj.range=this.range;
                testContentObj.range_to=this.range_to;
              }
              if(this.data_type == 'numeric unbound'){
                testContentObj.unit=this.unit;
                testContentObj.opertaion=this.opertaion;
                testContentObj.operation_value=this.operation_value;
              }
              if(this.data_type == 'custom'){
                testContentObj.unit=this.unit;
                testContentObj.selected_options=this.selected_options;
                testContentObj.unit=this.unit;
                testContentObj.range=this.range;
              }
              if(this.data_type == 'text' || this.data_type =="multiple ranges"){
                testContentObj.unit=this.unit;
                testContentObj.range=this.range;
              }
      
              testContentObj.apply_formula=this.apply_formula;
              testContentObj.formula=this.formula;
              
              for(var i=0; i<this.testContentList.length;i++){
                if(this.testContentList[i].field_name == this.title_field_of_subfield){
                  this.testContentList[i].sub_fiels_list.push(testContentObj);
                }
              }

              // this.testContentList.push(testContentObj);
              if(this.data_type == 'numeric'){
                this.field_name_list.push(this.field_name);
              }
              this.toaster.success("Record Added Successfully");
              this.resetContentField();
          }
      }else{
        // alert("Please Select Mandatory Field!")
        this.toaster.warning("Please Select Mandatory Field!");
      }
    }

  }

  resetContentField(){
    this.field_type="Single Field";
    this.title_field="";
    this.title_field_of_subfield="";
    this.field_name="";
    this.data_type="numeric";
    this.unit="";
    this.range="";
    this.range_to="";
    this.opertaion="";
    this.operation_value="";
    this.apply_formula="N";
    this.formula="";

    this.modifyRow=false;
    this.indexForModify=-1;
    this.selected = -1;
    this.subFieldSelected=-1;
  }

  removeFormtestContentList(i:number,item:any){
    var b=false;
    if(item.field_name != "" && item.data_type==""){
       
        if(this.testContentList[i].sub_fiels_list.length >0){
          this.toaster.warning("Title Field is assign to below the another field!");
        }else{
          const index=this.title_field_list.indexOf(item.field_name,0);
          if(index >-1){
            this.title_field_list.splice(index,1);
          }
          const index1=this.field_name_list.indexOf(item.field_name,0);
          if(index1 >-1){
            this.field_name_list.splice(index1,1);
          }
          this.testContentList.splice(i,1);

          if(this.indexForModify == i){
            this.resetContentField();
          }
          this.toaster.success("Row remove successfully");
        }
    }else{
      const index=this.title_field_list.indexOf(item.field_name,0);
      if(index >-1){
        this.title_field_list.splice(index,1);
      }
      const index1=this.field_name_list.indexOf(item.field_name,0);
          if(index1 >-1){
            this.field_name_list.splice(index1,1);
          }
      this.testContentList.splice(i,1);

      if(this.indexForModify == i){
        this.resetContentField();
      }
      this.toaster.success("Row remove successfully");
    }
  }

  removeFormSubFielsLlist(i:number,item:any){

    const index1=this.field_name_list.indexOf(item.field_name,0);
          if(index1 >-1){
            this.field_name_list.splice(index1,1);
          }
          this.testContentList[this.subFieldTitleIdex].sub_fiels_list.splice(i,1);
          this.toaster.success("Row remove successfully");
  }

  onClickTestField(event:any , item:any,i:number){
    this.resetContentField();
    this.selected = i;
    this.subFieldSelected=-1;
    if (!event.target.checked) {
      this.resetContentField();
    }else{
      this.modifyRow=true;
      this.indexForModify=i;
      let testContentObj={
        test_code:"",
        sr_no:0,
        field_type:"",
        field_name:"",
        sub_field:"",
        data_type:"",
        unit:"",
        range:"",
        range_to:"",
        opertaion:"",
        operation_value:"",
        selected_options:[],
        apply_formula:"",
        formula:"",
        sub_fiels_list:[]
      }
      testContentObj= item;
      this.test_code=testContentObj.test_code;
      this.field_type=testContentObj.field_type;
      if(testContentObj.data_type == ""){
        this.title_field=testContentObj.field_name;
      }else if(testContentObj.sub_field!="" ){
        this.title_field_of_subfield=testContentObj.field_name;
        this.field_name=testContentObj.sub_field;
      }else{
        this.field_name=testContentObj.field_name;
      }
      this.data_type=testContentObj.data_type;
      this.unit=testContentObj.unit;
      this.range=testContentObj.range;
      this.range_to=testContentObj.range_to;
      this.opertaion=testContentObj.opertaion;
      this.operation_value=this.operation_value;
      this.selected_options=testContentObj.selected_options;
      this.apply_formula=testContentObj.apply_formula;
      this.formula=testContentObj.formula;
    }

  }

  onClickTestSubField(event:any , item:any,i:number){
    this.resetContentField();
    this.subFieldSelected = i;
    this.selected=-1;
    if (!event.target.checked) {
      this.resetContentField();
    }else{
      this.modifyRow=true;
      let testContentObj={
        test_code:"",
        sr_no:0,
        field_type:"",
        field_name:"",
        sub_field:"",
        data_type:"",
        unit:"",
        range:"",
        range_to:"",
        opertaion:"",
        operation_value:"",
        selected_options:[],
        apply_formula:"",
        formula:"",
        sub_fiels_list:[]
      }
      testContentObj= item;
      this.test_code=testContentObj.test_code;
      this.field_type=testContentObj.field_type;
      if(testContentObj.data_type == ""){
        this.title_field=testContentObj.field_name;
      }else if(testContentObj.sub_field!="" ){
        this.title_field_of_subfield=testContentObj.field_name;
        this.field_name=testContentObj.sub_field;
      }else{
        this.field_name=testContentObj.field_name;
      }
      this.data_type=testContentObj.data_type;
      this.unit=testContentObj.unit;
      this.range=testContentObj.range;
      this.range_to=testContentObj.range_to;
      this.opertaion=testContentObj.opertaion;
      this.operation_value=this.operation_value;
      this.selected_options=testContentObj.selected_options;
      this.apply_formula=testContentObj.apply_formula;
      this.formula=testContentObj.formula;
    }

  }

  modifyRowInTestTable(){
    // if(this.indexForModify!=-1){
    //   this.testContentList[this.indexForModify].field_type=this.field_type;
    // }else{
    //   this.testContentList[this.subFieldTitleIdex][this.subFieldSelected].field_type=this.field_type;
    // }
    
    if(this.field_type == "Title Field"){
      var b=false;
      for(var i=0; i<this.testContentList.length;i++){
        if(i!=this.indexForModify && (this.testContentList[i].field_name == this.title_field || this.testContentList[i].sub_field ==this.title_field)){
          b=true;
        }if(this.testContentList[i].data_type==""){
          var sub_fiels_list= this.testContentList[i].sub_fiels_list;
          for(var j=0; j<sub_fiels_list.length;j++){
            if(sub_fiels_list[j].sub_field ==this.title_field){
              b=true;
            }
          }
        }
      }
      if(b){
        this.toaster.warning("Title Name should not be same with other Field name or Sub-field name!");
      }else{
        var existingTitle= this.testContentList[this.indexForModify].field_name;
        this.testContentList[this.indexForModify].field_name=this.title_field;
        for(var i=0; i<this.testContentList.length;i++){
          if(this.testContentList[i].field_name == existingTitle && this.testContentList[i].sub_field !=""){
            this.testContentList[i].field_name=this.title_field;
          }
        }
        var sub_fiels_list = this.testContentList[this.indexForModify].sub_fiels_list;
        for(var j=0; j<sub_fiels_list.length;j++){
          sub_fiels_list[j].field_name = this.title_field;
        }
        this.title_field_list[this.title_field_list.indexOf(existingTitle)]=this.title_field;
        this.toaster.success("Row Modified successfully");
        this.resetContentField();
      }
    }
    else if(this.field_type == "Sub Field"){
      
      var b=false;
      for(var i=0; i<this.testContentList.length;i++){
        if(this.testContentList[i].field_name == this.field_name || this.testContentList[i].sub_field ==this.field_name){
          b=true;
        }if(this.testContentList[i].data_type==""){
          var sub_fiels_list= this.testContentList[i].sub_fiels_list;
          for(var j=0; j<sub_fiels_list.length;j++){
            if(sub_fiels_list[j].sub_field ==this.field_name && !(sub_fiels_list[j].field_name == this.title_field_of_subfield && j==this.subFieldSelected)){
              b=true;
            }
          }
        }
      }
      if(b){
        this.toaster.warning("Sub-Field Name should not be same with other Field name or Sub-field name!");
      }else{
      
        var existingSubField= this.testContentList[this.subFieldTitleIdex].sub_fiels_list[this.subFieldSelected].sub_field;

        this.testContentList[this.subFieldTitleIdex].sub_fiels_list[this.subFieldSelected].sub_field=this.field_name;
        this.testContentList[this.subFieldTitleIdex].sub_fiels_list[this.subFieldSelected].data_type=this.data_type;
        this.testContentList[this.subFieldTitleIdex].sub_fiels_list[this.subFieldSelected].unit=this.unit;
        this.testContentList[this.subFieldTitleIdex].sub_fiels_list[this.subFieldSelected].range=this.range;
        this.testContentList[this.subFieldTitleIdex].sub_fiels_list[this.subFieldSelected].range_to=this.range_to;
        this.testContentList[this.subFieldTitleIdex].sub_fiels_list[this.subFieldSelected].opertaion=this.opertaion;
        this.testContentList[this.subFieldTitleIdex].sub_fiels_list[this.subFieldSelected].operation_value=this.operation_value;
        this.testContentList[this.subFieldTitleIdex].sub_fiels_list[this.subFieldSelected].selected_options=this.selected_options;
        this.testContentList[this.subFieldTitleIdex].sub_fiels_list[this.subFieldSelected].apply_formula=this.apply_formula;
        this.testContentList[this.subFieldTitleIdex].sub_fiels_list[this.subFieldSelected].formula=this.formula;

        this.field_name_list[this.field_name_list.indexOf(existingSubField)]=this.field_name;

        this.toaster.success("Row Modified successfully");
        this.resetContentField();
      }
    }
    else if(this.field_type == "Single Field"){
      //title modify or not is pending
      var b=false;
      for(var i=0; i<this.testContentList.length;i++){
        if(i!=this.indexForModify && (this.testContentList[i].field_name == this.field_name || this.testContentList[i].sub_field ==this.field_name)){
          b=true;
        }if(this.testContentList[i].data_type==""){
          var sub_fiels_list= this.testContentList[i].sub_fiels_list;
          for(var j=0; j<sub_fiels_list.length;j++){
            if(sub_fiels_list[j].field_name == this.title_field || sub_fiels_list[j].sub_field ==this.title_field){
              b=true;
            }
          }
        }
      }
      if(b){
        this.toaster.warning("Field Name should not be same with other Field name or Sub-field name!");
      }else{
        var existingField= this.testContentList[this.indexForModify].field_name;

        this.testContentList[this.indexForModify].field_name=this.field_name;
        this.testContentList[this.indexForModify].data_type=this.data_type;
        this.testContentList[this.indexForModify].unit=this.unit;
        this.testContentList[this.indexForModify].range=this.range;
        this.testContentList[this.indexForModify].range_to=this.range_to;
        this.testContentList[this.indexForModify].opertaion=this.opertaion;
        this.testContentList[this.indexForModify].operation_value=this.operation_value;
        this.testContentList[this.indexForModify].selected_options=this.selected_options;
        this.testContentList[this.indexForModify].apply_formula=this.apply_formula;
        this.testContentList[this.indexForModify].formula=this.formula;

        this.field_name_list[this.field_name_list.indexOf(existingField)]=this.field_name;
        
        this.toaster.success("Row Modified successfully");
        this.resetContentField();
      }
    }
  }

  //drag and drop of test table row
  drop(event: CdkDragDrop<string[]>) {
   
        this.resetContentField();
        moveItemInArray(this.testContentList, event.previousIndex, event.currentIndex);
        this.toaster.success("Row move to "+event.currentIndex+" position successfully");
  
  }
  subListDrop(event: CdkDragDrop<string[]>){
    this.resetContentField();
    moveItemInArray(this.testContentList[ this.subFieldTitleIdex].sub_fiels_list, event.previousIndex, event.currentIndex);
        this.toaster.success("Row move to "+event.currentIndex+" position successfully");
  }

  isRowClickable(rowIndex: number): boolean {
    return this.testContentList[rowIndex].data_type == "";
  }

  openSUbFieldTable(i:number){
    this.resetContentField();
    this.expanded[i] = !this.expanded[i];
    this.subfieldTableFlag=this.expanded[i];
    this.subFieldTitleIdex=i;
    this.sub_fiels_list=this.testContentList[i].sub_fiels_list;
  }

  createReportPdfData(){
    this.reportPdfList=[];
    for(var i=0;i<this.testContentList.length;i++){
      this.reportPdfList.push(this.testContentList[i]);
      if(this.testContentList[i].sub_fiels_list.length>0){
        for(var j=0; j<this.testContentList[i].sub_fiels_list.length; j++){
          this.reportPdfList.push(this.testContentList[i].sub_fiels_list[j]);
        }
      }
    }

  }

  makePdf(){

    let pdf= new jsPDF('p','pt','a4');
    let pdf1= new jsPDF('p','pt','a4');
    var pdf2bolb:any;

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

    //topBar
    //image
    

    //Box
    pdf.setFontSize(10.5);
    pdf.line(20, 80, 575, 80, "S");
    pdf.line(20, 160, 575, 160, "S");
    pdf.line(20, 80, 20, 160, "S");
    pdf.line(575, 80, 575, 160, "S");

    //patient Box Data
    pdf.text("Name",40,95);
    pdf.text("Age/Gender",40,113);
    pdf.text("Referred By",40,131);
    pdf.text("Phone No.",40,149);

    pdf.text(":",110,95);
    pdf.text(":",110,113);
    pdf.text(":",110,131);
    pdf.text(":",110,149);

    pdf.text("",120,95);
    pdf.text("",120,113);
    pdf.text("",120,131);
    pdf.text("",120,149);

    pdf.text("Patient ID",310,95);
    pdf.text("Report ID",310,113);
    pdf.text("Collection Date",310,131);
    pdf.text("Phone No.",310,149);

    pdf.text(":",390,95);
    pdf.text(":",390,113);
    pdf.text(":",390,131);
    pdf.text(":",390,149);

    pdf.text("",400,95);
    pdf.text("",400,113);
    pdf.text("",400,131);
    pdf.text("",400,149);

    var v=pdf.getFont();
  
    pdf.setFontSize(11);
    pdf.text(this.department,297.5,175,{align : "center"});
    if(this.test_code != null && this.test_code != ""){
      pdf.text(this.test_name+" ("+this.test_code+")",297.5,192,{align : "center"});
    }
    if(this.test_type == 'Table'){

      pdf.line(20, 200, 575, 200, "S");
      pdf.line(20, 220, 575, 220, "S");

      this.reportPdfList=[];
      for(var i=0;i<this.testContentList.length;i++){
        this.reportPdfList.push(this.testContentList[i]);
        if(this.testContentList[i].sub_fiels_list.length>0){
          for(var j=0; j<this.testContentList[i].sub_fiels_list.length; j++){
            this.reportPdfList.push(this.testContentList[i].sub_fiels_list[j]);
          }
        }
      }
      let reportTableList=[];

      for(var i=0; i<this.reportPdfList.length;i++){
        let list=[];
        if(this.reportPdfList[i].field_type != 'Sub Field'){
          list.push(this.reportPdfList[i].field_name);
        }else if(this.reportPdfList[i].field_type == 'Sub Field'){
          list.push("    "+this.reportPdfList[i].sub_field);
        }

        list.push("");
        list.push("");

        if(this.reportPdfList[i].range != "" && this.reportPdfList[i].range_to != ""){
          list.push(this.reportPdfList[i].range+"-"+this.reportPdfList[i].range_to);
        }else if(this.reportPdfList[i].range != "" && this.reportPdfList[i].range_to == ""){
          list.push(this.reportPdfList[i].range);
        }else if (this.reportPdfList[i].field_type != 'Title Field' && this.reportPdfList[i].range == "" ){
          list.push("-");
        }else{
          list.push("");
        }

        if(this.reportPdfList[i].unit != ""){
          list.push(this.reportPdfList[i].unit);
        }else if(this.reportPdfList[i].unit == "" && this.reportPdfList[i].field_type != 'Title Field' ){
          list.push("-");
        }else{
          list.push("");
        }
        reportTableList.push(list);

      }
      autoTable(pdf, {
          head: [['TEST DESCRIPTION', 'RESULT', 'FLAG','REF. RANGE','UNIT']],
          margin: { top: 200,right:20,left:20 },
          body: reportTableList,
          theme:"plain"
        })
      //pdf.save("sample.pdf");
          pdf.setProperties({
            title: "Report"
        });

    }else{
      pdf.line(20, 200, 575, 200, "S");
      pdf.html(this.el.nativeElement,{
        callback :(pdf)=>{
          pdf.setFontSize(9);
          var blob = pdf.output("blob");
          var usrl=window.URL.createObjectURL(blob);
          this.pdfurl=this.transform(usrl);
        },
        y:185,
        margin :22
        
      })
      // autoTable(pdf, {
      //   head: [['TEST DESCRIPTION']],
      //   margin: { top: 200,right:20,left:20 },
      //   body: [[]],
      //   theme:"plain"
      // })
    //pdf.save("sample.pdf");
        pdf.setProperties({
          title: "Report"
      });
    }
    pdf.setFontSize(10);
    pdf.text('Footer Text', pdf.internal.pageSize.width - 60, pdf.internal.pageSize.height - 15,{align : "center"});
     var blob = pdf.output("blob");
     var usrl=window.URL.createObjectURL(blob);
     this.pdfurl=this.transform(usrl);
  }

  transform(url:string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
     }

     saveTest(){
      alert("chsakhjkasc askcnsajkc");
     }

}
