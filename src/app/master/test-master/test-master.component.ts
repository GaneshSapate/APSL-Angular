import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ToastrService } from 'ngx-toastr';
import { TestMasterObj } from '../../Model/TestMasterObj';
import { TestTableData } from 'src/app/Model/TestTableData';
import { SubFieldData } from 'src/app/Model/SubFieldData';
import { TestService } from 'src/app/service/test.service';
import { ErrorObj } from 'src/app/Model/ErrorObj';

@Component({
  selector: 'app-test-master',
  templateUrl: './test-master.component.html',
  styleUrls: ['./test-master.component.css']
})
export class TestMasterComponent implements OnInit {

    // Master Page Routing Variables
  // End Of Masters Routing Variables
  @Output() masterPageObjEmmitter = new EventEmitter<any>();
  
  masterPageObj:any={
    masterPageShow:true,
    docterManagement:false,
    reportManagement:false,
    labManagement:false
  }

   // Report Managment Variables

  testMaster=<TestMasterObj>{};
  testTableData= <TestTableData>{};
  subFieldData=<SubFieldData>{};
  

  //Test Modal name variables
  modalTitle="";
  ModalButtonName="";
  addmodal:boolean=false;
  modifyModal:boolean=false;

  //proceedModalPopup
  proceedModalMessage:string="";
  proceedModalButton:string="";
  //text editor variable
  textContent:string="";

  //test table variables
  field_type:string="Single Field";
  title_field:string="";
  title_field_of_subfield:string="";
  field_name:string="";
  data_type:string="numeric";
  unit:string="";
  range_from:string="";
  range_to:string="";
  opertaion:string="";
  operation_value:string="";
  apply_formula:boolean=false;
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
  subFieldDataList:any=[];
  subFieldSelected:number=-1;

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

 //  Patient Management Variables
testMasterList=[<TestMasterObj>{}];

number1:number = 5420;
number2:number = 5.56;

p:number=1;

errorObj=<ErrorObj>{};

@ViewChild('saveModal') saveModal:any;

//delete test variables
deleteTestId:number=0;
@ViewChild('OptionModal') OptionModal:any;

  constructor(private toaster : ToastrService,
              private sanitizer: DomSanitizer,
              private testService:TestService) { 
      this.pdfurl=sanitizer.bypassSecurityTrustResourceUrl(this.pdfurl);
    }

  ngOnInit(): void {
    this.loadAlltest();
  }
  loadAlltest(){
    var userId = <number> new Number(sessionStorage.getItem("mainUserId"));
    this.testService.getTestListById(userId).subscribe(
      (r)=>{
        this.testMasterList=<any>r;
      },(e)=>{
        this.errorObj=<any>e;
        this.toaster.error(this.errorObj.message,"Error");
      }
    )
  }

  clickonBack(){
    this.masterPageObj.masterPageShow =true;
    this.masterPageObj.docterManagement = false;
    this.masterPageObj.reportManagement = false;
    this.masterPageObj.labManagement = false;
    this.masterPageObjEmmitter.emit(this.masterPageObj);
  }

  addNewTestModal(){
    this.addmodal=true;
    this.modifyModal=false;
    this.modalTitle="Add New Test"
    this.ModalButtonName="Proceed";
    this.testMaster=<TestMasterObj>{};
    this.testMaster.department="";
    this.testMaster.testType="";
    this.testMaster.testGender="";
    this.testMaster.testGender="";
    this.testMaster.sampleType="";
    this.testMaster.testTableDataDTOList=[];
    this.resetContentField();
    this.subfieldTableFlag=false;
    this.subFieldTitleIdex=-1
    this.subFieldDataList=[];
    this.subFieldSelected=-1;
    this.selected_options=[];
    this.title_field_list=[];
    this.field_name_list=[];
    this.allTestList=[];
  }

  onProceedClick(){
    if(this.addmodal){
      this.proceedModalMessage="Do you want to add a New Test";
    }
    if(this.modifyModal){
      this.proceedModalMessage="Do you want to save the all changes";
    }
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

    let testContentObj=<TestTableData>{}
    if(this.field_type == 'Single Field'){

      if(this.field_name && this.data_type ){
        var b=false;
        testContentObj.field_name=this.field_name;
        this.testMaster.testTableDataDTOList.forEach(function (value:any) {
            if(value.field_name == testContentObj.field_name || value.sub_field == testContentObj.field_name){
              b=true;
            }
            if(!value.data_type){
              value.subFieldDataList.forEach(function (subVanlue:any){
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
            testContentObj.field_type=this.field_type;
            testContentObj.data_type=this.data_type;
    
            if(this.data_type == 'numeric'){
              testContentObj.unit=this.unit;
              testContentObj.range_from=this.range_from;
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
              testContentObj.range_from=this.range_from;
            }
            if(this.data_type == 'text' || this.data_type =="multiple ranges"){
              testContentObj.unit=this.unit;
              testContentObj.range_from=this.range_from;
            }
    
            testContentObj.apply_formula=this.apply_formula;
            testContentObj.formula=this.formula;
            
            this.testMaster.testTableDataDTOList.push(testContentObj);
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

      if(this.title_field ){
        var b=false;
        testContentObj.field_type=this.field_type;
        testContentObj.field_name=this.title_field;
        testContentObj.subFieldDataList=[];

        this.testMaster.testTableDataDTOList.forEach(function (value:any) {
          if( value.field_name == testContentObj.field_name || value.sub_field == testContentObj.field_name){
            b=true;
          }
          if(!value.data_type){
            value.subFieldDataList.forEach(function (subVanlue:any){
              if( subVanlue.field_name == testContentObj.field_name || subVanlue.sub_field == testContentObj.field_name){
                b=true;
              }
            });
          }
          
        });
        if(b){
          this.toaster.warning("Title Name should not be same with other Field name or Sub-field name!");
        }else{
          this.testMaster.testTableDataDTOList.push(testContentObj);
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

      if(this.field_name && this.data_type && this.title_field_of_subfield){

        var b=false;
        testContentObj.field_name=this.title_field_of_subfield;
        testContentObj.sub_field=this.field_name;
        this.testMaster.testTableDataDTOList.forEach(function (value:any) {
            if( value.field_name == testContentObj.sub_field || value.sub_field == testContentObj.sub_field){
              b=true;
            }
            if(!value.data_type){
              value.subFieldDataList.forEach(function (subVanlue:any){
                if( subVanlue.sub_field == testContentObj.field_name){
                  b=true;
                }
              });
            }
          });

          if(b){
            this.toaster.warning("Sub-Field Name should not be same with other Field name or Sub-field name!");
          }else{
              testContentObj.field_type=this.field_type;
              testContentObj.data_type=this.data_type;
      
              if(this.data_type == 'numeric'){
                testContentObj.unit=this.unit;
                testContentObj.range_from=this.range_from;
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
                testContentObj.range_from=this.range_from;
              }
              if(this.data_type == 'text' || this.data_type =="multiple ranges"){
                testContentObj.unit=this.unit;
                testContentObj.range_from=this.range_from;
              }
      
              testContentObj.apply_formula=this.apply_formula;
              testContentObj.formula=this.formula;
              
              for(var i=0; i<this.testMaster.testTableDataDTOList.length;i++){
                if(this.testMaster.testTableDataDTOList[i].field_name == this.title_field_of_subfield){
                  this.testMaster.testTableDataDTOList[i].subFieldDataList.push(testContentObj);
                }
              }

              // this.testMaster.testTableDataDTOList.push(testContentObj);
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
    this.range_from="";
    this.range_to="";
    this.opertaion="";
    this.operation_value="";
    this.apply_formula=false;
    this.formula="";

    this.modifyRow=false;
    this.indexForModify=-1;
    this.selected = -1;
    this.subFieldSelected=-1;
  }

  removeFormtestContentList(i:number,item:any){
    var b=false;
    if(item.field_name  && !item.data_type){
       
        if(this.testMaster.testTableDataDTOList[i].subFieldDataList.length >0){
          this.toaster.warning("Title Field is assign to below the another field!");
        }else{
          const index=this.subFieldDataList.indexOf(item.field_name,0);
          if(index >-1){
            this.subFieldDataList.splice(index,1);
          }
          const index1=this.field_name_list.indexOf(item.field_name,0);
          if(index1 >-1){
            this.field_name_list.splice(index1,1);
          }
          this.testMaster.testTableDataDTOList.splice(i,1);

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
      this.testMaster.testTableDataDTOList.splice(i,1);

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
          this.testMaster.testTableDataDTOList[this.subFieldTitleIdex].subFieldDataList.splice(i,1);
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
      let testContentObj=<TestTableData>{}
      testContentObj= item;
      this.field_type=testContentObj.field_type;
      if(!testContentObj.data_type){
        this.title_field=testContentObj.field_name;
      }else if(testContentObj.sub_field ){
        this.title_field_of_subfield=testContentObj.field_name;
        this.field_name=testContentObj.sub_field;
      }else{
        this.field_name=testContentObj.field_name;
      }
      this.data_type=testContentObj.data_type;
      this.unit=testContentObj.unit;
      this.range_from=testContentObj.range_from;
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
      let testContentObj=<TestTableData>{}
      testContentObj= item;
      this.field_type=testContentObj.field_type;
      if(!testContentObj.data_type){
        this.title_field=testContentObj.field_name;
      }else if(testContentObj.sub_field ){
        this.title_field_of_subfield=testContentObj.field_name;
        this.field_name=testContentObj.sub_field;
      }else{
        this.field_name=testContentObj.field_name;
      }
      this.data_type=testContentObj.data_type;
      this.unit=testContentObj.unit;
      this.range_from=testContentObj.range_from;
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
    //   this.testMaster.testTableDataDTOList[this.indexForModify].field_type=this.field_type;
    // }else{
    //   this.testMaster.testTableDataDTOList[this.subFieldTitleIdex][this.subFieldSelected].field_type=this.field_type;
    // }
    
    if(this.field_type == "Title Field"){
      var b=false;
      for(var i=0; i<this.testMaster.testTableDataDTOList.length;i++){
        if(i!=this.indexForModify && (this.testMaster.testTableDataDTOList[i].field_name == this.title_field || this.testMaster.testTableDataDTOList[i].sub_field ==this.title_field)){
          b=true;
        }if(this.testMaster.testTableDataDTOList[i].data_type==""){
          var subFieldDataList= this.testMaster.testTableDataDTOList[i].subFieldDataList;
          for(var j=0; j<subFieldDataList.length;j++){
            if(subFieldDataList[j].sub_field ==this.title_field){
              b=true;
            }
          }
        }
      }
      if(b){
        this.toaster.warning("Title Name should not be same with other Field name or Sub-field name!");
      }else{
        var existingTitle= this.testMaster.testTableDataDTOList[this.indexForModify].field_name;
        this.testMaster.testTableDataDTOList[this.indexForModify].field_name=this.title_field;
        for(var i=0; i<this.testMaster.testTableDataDTOList.length;i++){
          if(this.testMaster.testTableDataDTOList[i].field_name == existingTitle && this.testMaster.testTableDataDTOList[i].sub_field !=""){
            this.testMaster.testTableDataDTOList[i].field_name=this.title_field;
          }
        }
        var subFieldDataList = this.testMaster.testTableDataDTOList[this.indexForModify].subFieldDataList;
        for(var j=0; j<subFieldDataList.length;j++){
          subFieldDataList[j].field_name = this.title_field;
        }
        this.title_field_list[this.title_field_list.indexOf(existingTitle)]=this.title_field;
        this.toaster.success("Row Modified successfully");
        this.resetContentField();
      }
    }
    else if(this.field_type == "Sub Field"){
      
      var b=false;
      for(var i=0; i<this.testMaster.testTableDataDTOList.length;i++){
        if(this.testMaster.testTableDataDTOList[i].field_name == this.field_name || this.testMaster.testTableDataDTOList[i].sub_field ==this.field_name){
          b=true;
        }if(this.testMaster.testTableDataDTOList[i].data_type==""){
          var subFieldDataList= this.testMaster.testTableDataDTOList[i].subFieldDataList;
          for(var j=0; j<subFieldDataList.length;j++){
            if(subFieldDataList[j].sub_field ==this.field_name && !(subFieldDataList[j].field_name == this.title_field_of_subfield && j==this.subFieldSelected)){
              b=true;
            }
          }
        }
      }
      if(b){
        this.toaster.warning("Sub-Field Name should not be same with other Field name or Sub-field name!");
      }else{
      
        var existingSubField= this.testMaster.testTableDataDTOList[this.subFieldTitleIdex].subFieldDataList[this.subFieldSelected].sub_field;

        this.testMaster.testTableDataDTOList[this.subFieldTitleIdex].subFieldDataList[this.subFieldSelected].sub_field=this.field_name;
        this.testMaster.testTableDataDTOList[this.subFieldTitleIdex].subFieldDataList[this.subFieldSelected].data_type=this.data_type;
        this.testMaster.testTableDataDTOList[this.subFieldTitleIdex].subFieldDataList[this.subFieldSelected].unit=this.unit;
        this.testMaster.testTableDataDTOList[this.subFieldTitleIdex].subFieldDataList[this.subFieldSelected].range_from=this.range_from;
        this.testMaster.testTableDataDTOList[this.subFieldTitleIdex].subFieldDataList[this.subFieldSelected].range_to=this.range_to;
        this.testMaster.testTableDataDTOList[this.subFieldTitleIdex].subFieldDataList[this.subFieldSelected].opertaion=this.opertaion;
        this.testMaster.testTableDataDTOList[this.subFieldTitleIdex].subFieldDataList[this.subFieldSelected].operation_value=this.operation_value;
        this.testMaster.testTableDataDTOList[this.subFieldTitleIdex].subFieldDataList[this.subFieldSelected].selected_options=this.selected_options;
        this.testMaster.testTableDataDTOList[this.subFieldTitleIdex].subFieldDataList[this.subFieldSelected].apply_formula=this.apply_formula;
        this.testMaster.testTableDataDTOList[this.subFieldTitleIdex].subFieldDataList[this.subFieldSelected].formula=this.formula;

        this.field_name_list[this.field_name_list.indexOf(existingSubField)]=this.field_name;

        this.toaster.success("Row Modified successfully");
        this.resetContentField();
      }
    }
    else if(this.field_type == "Single Field"){
      //title modify or not is pending
      var b=false;
      for(var i=0; i<this.testMaster.testTableDataDTOList.length;i++){
        if(i!=this.indexForModify && (this.testMaster.testTableDataDTOList[i].field_name == this.field_name || this.testMaster.testTableDataDTOList[i].sub_field ==this.field_name)){
          b=true;
        }if(this.testMaster.testTableDataDTOList[i].data_type==""){
          var subFieldDataList= this.testMaster.testTableDataDTOList[i].subFieldDataList;
          for(var j=0; j<subFieldDataList.length;j++){
            if(subFieldDataList[j].field_name == this.title_field || subFieldDataList[j].sub_field ==this.title_field){
              b=true;
            }
          }
        }
      }
      if(b){
        this.toaster.warning("Field Name should not be same with other Field name or Sub-field name!");
      }else{
        var existingField= this.testMaster.testTableDataDTOList[this.indexForModify].field_name;

        this.testMaster.testTableDataDTOList[this.indexForModify].field_name=this.field_name;
        this.testMaster.testTableDataDTOList[this.indexForModify].data_type=this.data_type;
        this.testMaster.testTableDataDTOList[this.indexForModify].unit=this.unit;
        this.testMaster.testTableDataDTOList[this.indexForModify].range_from=this.range_from;
        this.testMaster.testTableDataDTOList[this.indexForModify].range_to=this.range_to;
        this.testMaster.testTableDataDTOList[this.indexForModify].opertaion=this.opertaion;
        this.testMaster.testTableDataDTOList[this.indexForModify].operation_value=this.operation_value;
        this.testMaster.testTableDataDTOList[this.indexForModify].selected_options=this.selected_options;
        this.testMaster.testTableDataDTOList[this.indexForModify].apply_formula=this.apply_formula;
        this.testMaster.testTableDataDTOList[this.indexForModify].formula=this.formula;

        this.field_name_list[this.field_name_list.indexOf(existingField)]=this.field_name;
        
        this.toaster.success("Row Modified successfully");
        this.resetContentField();
      }
    }
  }

  //drag and drop of test table row
  drop(event: CdkDragDrop<string[]>) {
   
        this.resetContentField();
        moveItemInArray(this.testMaster.testTableDataDTOList, event.previousIndex, event.currentIndex);
        this.toaster.success("Row move to "+event.currentIndex+" position successfully");
  
  }
  subListDrop(event: CdkDragDrop<string[]>){
    this.resetContentField();
    moveItemInArray(this.testMaster.testTableDataDTOList[ this.subFieldTitleIdex].subFieldDataList, event.previousIndex, event.currentIndex);
        this.toaster.success("Row move to "+event.currentIndex+" position successfully");
  }

  isRowClickable(rowIndex: number): boolean {
    return this.testMaster.testTableDataDTOList[rowIndex].data_type == undefined;
  }

  openSUbFieldTable(i:number){
    this.resetContentField();
    this.expanded[i] = !this.expanded[i];
    this.subfieldTableFlag=this.expanded[i];
    this.subFieldTitleIdex=i;
    this.subFieldDataList=this.testMaster.testTableDataDTOList[i].subFieldDataList;
  }

  createReportPdfData(){
    this.reportPdfList=[];
    for(var i=0;i<this.testMaster.testTableDataDTOList.length;i++){
      this.reportPdfList.push(this.testMaster.testTableDataDTOList[i]);
      if(this.testMaster.testTableDataDTOList[i].subFieldDataList.length>0){
        for(var j=0; j<this.testMaster.testTableDataDTOList[i].subFieldDataList.length; j++){
          this.reportPdfList.push(this.testMaster.testTableDataDTOList[i].subFieldDataList[j]);
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
    pdf.text(this.testMaster.department,297.5,175,{align : "center"});
    if(this.testMaster.testCode != null && this.testMaster.testCode != ""){
      pdf.text(this.testMaster.testName+" ("+this.testMaster.testCode+")",297.5,192,{align : "center"});
    }
    if(this.testMaster.testType == 'Table'){

      pdf.line(20, 200, 575, 200, "S");
      pdf.line(20, 220, 575, 220, "S");

      this.reportPdfList=[];
      for(var i=0;i<this.testMaster.testTableDataDTOList.length;i++){
        this.reportPdfList.push(this.testMaster.testTableDataDTOList[i]);
        if(this.testMaster.testTableDataDTOList[i].subFieldDataList.length>0){
          for(var j=0; j<this.testMaster.testTableDataDTOList[i].subFieldDataList.length; j++){
            this.reportPdfList.push(this.testMaster.testTableDataDTOList[i].subFieldDataList[j]);
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

        if(this.reportPdfList[i].range_from != "" && this.reportPdfList[i].range_to != ""){
          list.push(this.reportPdfList[i].range_from+"-"+this.reportPdfList[i].range_to);
        }else if(this.reportPdfList[i].range_from != "" && this.reportPdfList[i].range_to == ""){
          list.push(this.reportPdfList[i].range_from);
        }else if (this.reportPdfList[i].field_type != 'Title Field' && this.reportPdfList[i].range_from == "" ){
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

  addNewTest(){
    var userId = <number> new Number(sessionStorage.getItem("mainUserId"));
    let testMasterDTO = <TestMasterObj>{};
    this.testMaster.userId = <number> new Number(sessionStorage.getItem("mainUserId"));
    this.testService.addNewTest(this.testMaster,userId).subscribe(
      (r)=>{
        testMasterDTO = <any>r;
        this.toaster.success("Test Added Successfully");
        this.saveModal.nativeElement.click();
        this.loadAlltest();
      },(e)=>{
        this.errorObj=<any>e;
        this.toaster.error(this.errorObj.message,"Error");
      }
    )
  }
  openTest(id:number){
    this.modifyModal=true;
    this.addmodal=false;
    this.modalTitle="Test Details"
    this.ModalButtonName="Proceed";
    this.testMaster=<TestMasterObj>{};
    this.testMaster.department="";
    this.testMaster.testType="";
    this.testMaster.testGender="";
    this.testMaster.testGender="";
    this.testMaster.sampleType="";
    this.testMaster.testTableDataDTOList=[];
    this.resetContentField();
    this.subfieldTableFlag=false;
    this.subFieldTitleIdex=-1
    this.subFieldDataList=[];
    this.subFieldSelected=-1;
    this.selected_options=[];
    this.title_field_list=[];
    this.field_name_list=[];
    this.allTestList=[];
    this.testService.getTestById(id).subscribe(
      (r)=>{
        this.testMaster=<any>(r)
      },(e)=>{
        this.errorObj=<any>e;
        this.toaster.error(this.errorObj.message,"Error");
      }
    )
  }
  modifyTest(){
    var userId = <number> new Number(sessionStorage.getItem("mainUserId"));
    let testMasterDTO = <TestMasterObj>{};
    this.testService.updateTest(this.testMaster,userId).subscribe(
      (r)=>{
        testMasterDTO = <any>r;
        this.toaster.success("Test Updated Successfully");
        this.saveModal.nativeElement.click();
        this.loadAlltest();
      },(e)=>{
        this.errorObj=<any>e;
        this.toaster.error(this.errorObj.message,"Error");
      }
    )
  }
  setTestId(testId:number){
    this.deleteTestId=testId;
  }
  deleteTest(){
    this.testService.deleteTestById(this.deleteTestId).subscribe(
      (r)=>{
        let res = <any>r;
        this.toaster.success(res);
        this.OptionModal.nativeElement.click();
        this.loadAlltest();
      },(e)=>{
        this.errorObj=<any>e;
        this.toaster.error(this.errorObj.message,"Error");
      }
    )
  }



}
