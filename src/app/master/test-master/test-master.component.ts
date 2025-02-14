import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ToastrService } from 'ngx-toastr';
import { TestMasterObj } from '../../Model/TestMasterObj';
import { TestTableData } from 'src/app/Model/TestTableData';
import { TestService } from 'src/app/service/test.service';
import { ErrorObj } from 'src/app/Model/ErrorObj';
import { LabServiceService } from 'src/app/service/lab-service.service';
import { LabObj } from 'src/app/Model/LabObj';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-master',
  templateUrl: './test-master.component.html',
  styleUrls: ['./test-master.component.css']
})
export class TestMasterComponent implements OnInit {

  // Master Page Routing Variables
  // End Of Masters Routing Variables
  @Output() masterPageObjEmmitter = new EventEmitter<any>();

  masterPageObj: any = {
    masterPageShow: true,
    docterManagement: false,
    reportManagement: false,
    labManagement: false
  }
  // Report Managment Variables
  testMaster = <TestMasterObj>{};

  //Test Modal name variables
  modalTitle = "";
  ModalButtonName = "";
  addmodal: boolean = false;
  modifyModal: boolean = false;

  //proceedModalPopup
  proceedModalMessage: string = "";
  proceedModalButton: string = "";
  //text editor variable
  textContent: string = "";
  newTextContent: string = ";"

  //test table variables
  field_type: string = "Single Field";
  title_field: string = "";
  title_field_of_subfield: string = "";
  field_name: string = "";
  data_type: string = "numeric";
  unit: string = "";
  range_from: string = "";
  range_to: string = "";
  opertaion: string = "";
  operation_value: string = "";
  apply_formula: boolean = false;
  formula: string = "";

  selected_options: any = [];

  title_field_list: any = [];
  field_name_list: any = [];
  allTestList: any = [];

  selected: number = -1;
  modifyRow: boolean = false;
  indexForModify: number = -1;

  expanded: { [key: string]: boolean } = {};

  subfieldTableFlag: boolean = false;
  subFieldTitleIdex: number = -1
  subFieldDataList: any = [];
  subFieldSelected: number = -1;

  @ViewChild('pdfContent', { static: false }) el!: ElementRef;

  reportPdfList: any = [];
  spaceForSubfieldInReoprt: string = "    ";
  pdfurl: any;

  title: string = "";
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

  editorConfigView : AngularEditorConfig = {
    editable: false,
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
  //  Patient Management Variables
  testMasterList = [<TestMasterObj>{}];

  number1: number = 5420;
  number2: number = 5.56;

  p: number = 1;

  errorObj = <ErrorObj>{};

  @ViewChild('saveModal') saveModal: any;

  //delete test variables
  deleteTestId: number = 0;

  @ViewChild('OptionModal') OptionModal: any;

  constructor(private toaster: ToastrService,
    private sanitizer: DomSanitizer,
    private testService: TestService,
    private labService: LabServiceService,
    private router: Router) {
    this.pdfurl = sanitizer.bypassSecurityTrustResourceUrl(this.pdfurl);
  }

  ngOnInit(): void {
    this.loadAlltest();
  }
  loadAlltest() {
    var userId = <number>new Number(sessionStorage.getItem("mid"));
    this.testService.getTestListById(userId).subscribe(
      (r) => {
        this.testMasterList = <any>r;
      })
  }

  clickonBack() {
    this.router.navigate(['dashboard/master'])
  }

  addNewTestModal() {
    this.addmodal = true;
    this.modifyModal = false;
    this.modalTitle = "Add New Test"
    this.ModalButtonName = "Proceed";
    this.testMaster = <TestMasterObj>{};
    this.testMaster.department = "";
    this.testMaster.testType = "";
    this.testMaster.testGender = "";
    this.testMaster.testGender = "";
    this.testMaster.sampleType = "";
    this.testMaster.testTableDataDTOList = [];
    this.resetContentField();
    this.subfieldTableFlag = false;
    this.subFieldTitleIdex = -1
    this.subFieldDataList = [];
    this.subFieldSelected = -1;
    this.selected_options = [];
    this.title_field_list = [];
    this.field_name_list = [];
    this.allTestList = [];
  }

  onProceedClick() {
    if (this.addmodal) {
      this.proceedModalMessage = "Do you want to add a New Test";
    }
    if (this.modifyModal) {
      this.proceedModalMessage = "Do you want to save the all changes";
    }
  }
  // Add new reports methods start
  addCustom(selectOptions: string) {
    if (selectOptions != '') {
      this.selected_options.push(selectOptions);
    } else {
      alert("please select options");
    }
  }
  removefromlistOfOptopns(item: number) {
    this.selected_options.splice(item, 1);
  }

  addRowInTestTable() {
    let testContentObj = <TestTableData>{}
    if (this.field_type == 'Single Field') {

      if (this.field_name && this.data_type) {
        var b = false;
        testContentObj.field_name = this.field_name;
        this.testMaster.testTableDataDTOList.forEach(function (value: any) {
          if (value.field_name == testContentObj.field_name || value.sub_field == testContentObj.field_name) {
            b = true;
          }
          if (!value.data_type) {
            value.subFieldDataList.forEach(function (subVanlue: any) {
              if (subVanlue.field_name == testContentObj.field_name || subVanlue.sub_field == testContentObj.field_name) {
                b = true;
              }
            });
          }
        });

        if (b) {
          this.toaster.warning("Field Name should not be same with other Field name or Sub-field name!");
        }
        else {
          testContentObj.field_type = this.field_type;
          testContentObj.data_type = this.data_type;

          if (this.data_type == 'numeric') {
            testContentObj.unit = this.unit;
            testContentObj.range_from = this.range_from;
            testContentObj.range_to = this.range_to;
          }
          if (this.data_type == 'numeric unbound') {
            testContentObj.unit = this.unit;
            testContentObj.opertaion = this.opertaion;
            testContentObj.operation_value = this.operation_value;
          }
          if (this.data_type == 'custom') {
            if (this.selected_options.length > 0) {
              testContentObj.selected_options = this.selected_options;
            } else {
              this.toaster.error("Please select option and add !");
              return;
            }
            testContentObj.unit = this.unit;
            testContentObj.range_from = this.range_from;
          }
          if (this.data_type == 'text' || this.data_type == "multiple ranges") {
            testContentObj.unit = this.unit;
            testContentObj.range_from = this.range_from;
          }

          testContentObj.apply_formula = this.apply_formula;
          testContentObj.formula = this.formula;
          if (this.apply_formula) {
            this.createFormula();
            let formula = this.formula.trim();
            let requestMessage = {
              flag: false,
              message: formula
            }
            let responseMessage: {
              flag: boolean;
              message: string;
            }
            this.testService.validateFormula(requestMessage).subscribe(
              (r) => {
                responseMessage = <any>r;
                if (!responseMessage.flag) {
                  this.toaster.error(responseMessage.message);
                  return;
                } else {
                  this.testMaster.testTableDataDTOList.push(testContentObj);
                  if (this.data_type == 'numeric') {
                    this.field_name_list.push(this.field_name);
                  }
                  this.toaster.success("Record Added Successfully");
                  this.resetContentField();
                }
              })
          } else {
            this.testMaster.testTableDataDTOList.push(testContentObj);
            if (this.data_type == 'numeric') {
              this.field_name_list.push(this.field_name);
            }
            this.toaster.success("Record Added Successfully");
            this.resetContentField();
          }
        }
      } else {
        // alert("Please Select Mandatory Field!")
        this.toaster.warning("Please Select Mandatory Field!");
      }
    }

    if (this.field_type == 'Title Field') {

      if (this.title_field) {
        var b = false;
        testContentObj.field_type = this.field_type;
        testContentObj.field_name = this.title_field;
        testContentObj.subFieldDataList = [];

        this.testMaster.testTableDataDTOList.forEach(function (value: any) {
          if (value.field_name == testContentObj.field_name || value.sub_field == testContentObj.field_name) {
            b = true;
          }
          if (!value.data_type) {
            value.subFieldDataList.forEach(function (subVanlue: any) {
              if (subVanlue.field_name == testContentObj.field_name || subVanlue.sub_field == testContentObj.field_name) {
                b = true;
              }
            });
          }
        });
        if (b) {
          this.toaster.warning("Title Name should not be same with other Field name or Sub-field name!");
        } else {
          this.testMaster.testTableDataDTOList.push(testContentObj);
          this.title_field_list.push(this.title_field);
          this.toaster.success("Title Added Successfully");
          this.resetContentField();
        }
      } else {
        // alert("Please Select Mandatory Field!")
        this.toaster.warning("Please Select Mandatory Field!");
      }
    }
    if (this.field_type == 'Sub Field') {

      if (this.field_name && this.data_type && this.title_field_of_subfield) {

        var b = false;
        testContentObj.field_name = this.title_field_of_subfield;
        testContentObj.sub_field = this.field_name;
        this.testMaster.testTableDataDTOList.forEach(function (value: any) {
          if (value.field_name == testContentObj.sub_field || value.sub_field == testContentObj.sub_field) {
            b = true;
          }
          if (!value.data_type) {
            value.subFieldDataList.forEach(function (subVanlue: any) {
              if (subVanlue.sub_field == testContentObj.field_name) {
                b = true;
              }
            });
          }
        });

        if (b) {
          this.toaster.warning("Sub-Field Name should not be same with other Field name or Sub-field name!");
        } else {
          testContentObj.field_type = this.field_type;
          testContentObj.data_type = this.data_type;

          if (this.data_type == 'numeric') {
            testContentObj.unit = this.unit;
            testContentObj.range_from = this.range_from;
            testContentObj.range_to = this.range_to;
          }
          if (this.data_type == 'numeric unbound') {
            testContentObj.unit = this.unit;
            testContentObj.opertaion = this.opertaion;
            testContentObj.operation_value = this.operation_value;
          }
          if (this.data_type == 'custom') {
            if (this.selected_options.length > 0) {
              testContentObj.selected_options = this.selected_options;
            } else {
              this.toaster.error("Please select option and add !");
              return;
            }

            testContentObj.unit = this.unit;
            testContentObj.range_from = this.range_from;
          }
          if (this.data_type == 'text' || this.data_type == "multiple ranges") {
            testContentObj.unit = this.unit;
            testContentObj.range_from = this.range_from;
          }

          testContentObj.apply_formula = this.apply_formula;
          testContentObj.formula = this.formula;
          if (this.apply_formula) {
            this.createFormula();
            let formula = this.formula.trim();
            let requestMessage = {
              flag: false,
              message: formula
            }
            let responseMessage: {
              flag: boolean;
              message: string;
            }
            this.testService.validateFormula(requestMessage).subscribe(
              (r) => {
                responseMessage = <any>r;
                if (!responseMessage.flag) {
                  this.toaster.error(responseMessage.message);
                  return;
                } else {
                  for (var i = 0; i < this.testMaster.testTableDataDTOList.length; i++) {
                    if (this.testMaster.testTableDataDTOList[i].field_name == this.title_field_of_subfield) {
                      this.testMaster.testTableDataDTOList[i].subFieldDataList.push(testContentObj);
                    }
                  }

                  // this.testMaster.testTableDataDTOList.push(testContentObj);
                  if (this.data_type == 'numeric') {
                    this.field_name_list.push(this.field_name);
                  }
                  this.toaster.success("Record Added Successfully");
                  this.resetContentField();
                }
              })
          } else {
            for (var i = 0; i < this.testMaster.testTableDataDTOList.length; i++) {
              if (this.testMaster.testTableDataDTOList[i].field_name == this.title_field_of_subfield) {
                this.testMaster.testTableDataDTOList[i].subFieldDataList.push(testContentObj);
              }
            }
            // this.testMaster.testTableDataDTOList.push(testContentObj);
            if (this.data_type == 'numeric') {
              this.field_name_list.push(this.field_name);
            }
            this.toaster.success("Record Added Successfully");
            this.resetContentField();
          }

        }
      } else {
        // alert("Please Select Mandatory Field!")
        this.toaster.warning("Please Select Mandatory Field!");
      }
    }
  }

  resetContentField() {
    this.field_type = "Single Field";
    this.title_field = "";
    this.title_field_of_subfield = "";
    this.field_name = "";
    this.data_type = "numeric";
    this.unit = "";
    this.range_from = "";
    this.range_to = "";
    this.opertaion = "";
    this.operation_value = "";
    this.apply_formula = false;
    this.formula = "";

    this.modifyRow = false;
    this.indexForModify = -1;
    this.selected = -1;
    this.subFieldSelected = -1;
  }

  removeFormtestContentList(i: number, item: any) {
    var b = false;
    if (item.field_name && !item.data_type) {

      if (this.testMaster.testTableDataDTOList[i].subFieldDataList.length > 0) {
        this.toaster.warning("Title Field is assign to below the another field!");
      } else {
        const index = this.subFieldDataList.indexOf(item.field_name, 0);
        if (index > -1) {
          this.subFieldDataList.splice(index, 1);
        }
        const index1 = this.field_name_list.indexOf(item.field_name, 0);
        if (index1 > -1) {
          this.field_name_list.splice(index1, 1);
        }
        this.testMaster.testTableDataDTOList.splice(i, 1);

        if (this.indexForModify == i) {
          this.resetContentField();
        }
        this.toaster.success("Row remove successfully");
      }
    } else {
      const index = this.title_field_list.indexOf(item.field_name, 0);
      if (index > -1) {
        this.title_field_list.splice(index, 1);
      }
      const index1 = this.field_name_list.indexOf(item.field_name, 0);
      if (index1 > -1) {
        this.field_name_list.splice(index1, 1);
      }
      this.testMaster.testTableDataDTOList.splice(i, 1);

      if (this.indexForModify == i) {
        this.resetContentField();
      }
      this.toaster.success("Row remove successfully");
    }
  }

  removeFormSubFielsLlist(i: number, item: any) {

    const index1 = this.field_name_list.indexOf(item.field_name, 0);
    if (index1 > -1) {
      this.field_name_list.splice(index1, 1);
    }
    this.testMaster.testTableDataDTOList[this.subFieldTitleIdex].subFieldDataList.splice(i, 1);
    this.toaster.success("Row remove successfully");
  }

  onClickTestField(event: any, item: any, i: number) {
    this.resetContentField();
    this.selected = i;
    this.subFieldSelected = -1;
    if (!event.target.checked) {
      this.resetContentField();
    } else {
      this.modifyRow = true;
      this.indexForModify = i;
      let testContentObj = <TestTableData>{}
      testContentObj = item;
      this.field_type = testContentObj.field_type;
      if (!testContentObj.data_type) {
        this.title_field = testContentObj.field_name;
      } else if (testContentObj.sub_field) {
        this.title_field_of_subfield = testContentObj.field_name;
        this.field_name = testContentObj.sub_field;
      } else {
        this.field_name = testContentObj.field_name;
      }
      this.data_type = testContentObj.data_type;
      this.unit = testContentObj.unit;
      this.range_from = testContentObj.range_from;
      this.range_to = testContentObj.range_to;
      this.opertaion = testContentObj.opertaion;
      this.operation_value = this.operation_value;
      this.selected_options = testContentObj.selected_options;
      this.apply_formula = testContentObj.apply_formula;
      this.formula = testContentObj.formula;
    }
  }

  onClickTestSubField(event: any, item: any, i: number) {
    this.resetContentField();
    this.subFieldSelected = i;
    this.selected = -1;
    if (!event.target.checked) {
      this.resetContentField();
    } else {
      this.modifyRow = true;
      let testContentObj = <TestTableData>{}
      testContentObj = item;
      this.field_type = testContentObj.field_type;
      if (!testContentObj.data_type) {
        this.title_field = testContentObj.field_name;
      } else if (testContentObj.sub_field) {
        this.title_field_of_subfield = testContentObj.field_name;
        this.field_name = testContentObj.sub_field;
      } else {
        this.field_name = testContentObj.field_name;
      }
      this.data_type = testContentObj.data_type;
      this.unit = testContentObj.unit;
      this.range_from = testContentObj.range_from;
      this.range_to = testContentObj.range_to;
      this.opertaion = testContentObj.opertaion;
      this.operation_value = this.operation_value;
      this.selected_options = testContentObj.selected_options;
      this.apply_formula = testContentObj.apply_formula;
      this.formula = testContentObj.formula;
    }

  }

  modifyRowInTestTable() {
    if (this.field_type == "Title Field") {
      var b = false;
      for (var i = 0; i < this.testMaster.testTableDataDTOList.length; i++) {
        if (i != this.indexForModify && (this.testMaster.testTableDataDTOList[i].field_name == this.title_field || this.testMaster.testTableDataDTOList[i].sub_field == this.title_field)) {
          b = true;
        } if (this.testMaster.testTableDataDTOList[i].data_type == "") {
          var subFieldDataList = this.testMaster.testTableDataDTOList[i].subFieldDataList;
          for (var j = 0; j < subFieldDataList.length; j++) {
            if (subFieldDataList[j].sub_field == this.title_field) {
              b = true;
            }
          }
        }
      }
      if (b) {
        this.toaster.warning("Title Name should not be same with other Field name or Sub-field name!");
      } else {
        var existingTitle = this.testMaster.testTableDataDTOList[this.indexForModify].field_name;
        this.testMaster.testTableDataDTOList[this.indexForModify].field_name = this.title_field;
        for (var i = 0; i < this.testMaster.testTableDataDTOList.length; i++) {
          if (this.testMaster.testTableDataDTOList[i].field_name == existingTitle && this.testMaster.testTableDataDTOList[i].sub_field != "") {
            this.testMaster.testTableDataDTOList[i].field_name = this.title_field;
          }
        }
        var subFieldDataList = this.testMaster.testTableDataDTOList[this.indexForModify].subFieldDataList;
        for (var j = 0; j < subFieldDataList.length; j++) {
          subFieldDataList[j].field_name = this.title_field;
        }
        this.title_field_list[this.title_field_list.indexOf(existingTitle)] = this.title_field;
        this.toaster.success("Row Modified successfully");
        this.resetContentField();
      }
    }
    else if (this.field_type == "Sub Field") {

      var b = false;
      for (var i = 0; i < this.testMaster.testTableDataDTOList.length; i++) {
        if (this.testMaster.testTableDataDTOList[i].field_name == this.field_name || this.testMaster.testTableDataDTOList[i].sub_field == this.field_name) {
          b = true;
        } if (this.testMaster.testTableDataDTOList[i].data_type == "") {
          var subFieldDataList = this.testMaster.testTableDataDTOList[i].subFieldDataList;
          for (var j = 0; j < subFieldDataList.length; j++) {
            if (subFieldDataList[j].sub_field == this.field_name && !(subFieldDataList[j].field_name == this.title_field_of_subfield && j == this.subFieldSelected)) {
              b = true;
            }
          }
        }
      }
      if (b) {
        this.toaster.warning("Sub-Field Name should not be same with other Field name or Sub-field name!");
      } else {

        var existingSubField = this.testMaster.testTableDataDTOList[this.subFieldTitleIdex].subFieldDataList[this.subFieldSelected].sub_field;

        this.testMaster.testTableDataDTOList[this.subFieldTitleIdex].subFieldDataList[this.subFieldSelected].sub_field = this.field_name;
        this.testMaster.testTableDataDTOList[this.subFieldTitleIdex].subFieldDataList[this.subFieldSelected].data_type = this.data_type;
        this.testMaster.testTableDataDTOList[this.subFieldTitleIdex].subFieldDataList[this.subFieldSelected].unit = this.unit;
        this.testMaster.testTableDataDTOList[this.subFieldTitleIdex].subFieldDataList[this.subFieldSelected].range_from = this.range_from;
        this.testMaster.testTableDataDTOList[this.subFieldTitleIdex].subFieldDataList[this.subFieldSelected].range_to = this.range_to;
        this.testMaster.testTableDataDTOList[this.subFieldTitleIdex].subFieldDataList[this.subFieldSelected].opertaion = this.opertaion;
        this.testMaster.testTableDataDTOList[this.subFieldTitleIdex].subFieldDataList[this.subFieldSelected].operation_value = this.operation_value;
        this.testMaster.testTableDataDTOList[this.subFieldTitleIdex].subFieldDataList[this.subFieldSelected].selected_options = this.selected_options;
        this.testMaster.testTableDataDTOList[this.subFieldTitleIdex].subFieldDataList[this.subFieldSelected].apply_formula = this.apply_formula;
        this.testMaster.testTableDataDTOList[this.subFieldTitleIdex].subFieldDataList[this.subFieldSelected].formula = this.formula;

        this.field_name_list[this.field_name_list.indexOf(existingSubField)] = this.field_name;

        this.toaster.success("Row Modified successfully");
        this.resetContentField();
      }
    }
    else if (this.field_type == "Single Field") {
      //title modify or not is pending
      var b = false;
      for (var i = 0; i < this.testMaster.testTableDataDTOList.length; i++) {
        if (i != this.indexForModify && (this.testMaster.testTableDataDTOList[i].field_name == this.field_name || this.testMaster.testTableDataDTOList[i].sub_field == this.field_name)) {
          b = true;
        } if (this.testMaster.testTableDataDTOList[i].data_type == "") {
          var subFieldDataList = this.testMaster.testTableDataDTOList[i].subFieldDataList;
          for (var j = 0; j < subFieldDataList.length; j++) {
            if (subFieldDataList[j].field_name == this.title_field || subFieldDataList[j].sub_field == this.title_field) {
              b = true;
            }
          }
        }
      }
      if (b) {
        this.toaster.warning("Field Name should not be same with other Field name or Sub-field name!");
      } else {
        var existingField = this.testMaster.testTableDataDTOList[this.indexForModify].field_name;

        this.testMaster.testTableDataDTOList[this.indexForModify].field_name = this.field_name;
        this.testMaster.testTableDataDTOList[this.indexForModify].data_type = this.data_type;
        this.testMaster.testTableDataDTOList[this.indexForModify].unit = this.unit;
        this.testMaster.testTableDataDTOList[this.indexForModify].range_from = this.range_from;
        this.testMaster.testTableDataDTOList[this.indexForModify].range_to = this.range_to;
        this.testMaster.testTableDataDTOList[this.indexForModify].opertaion = this.opertaion;
        this.testMaster.testTableDataDTOList[this.indexForModify].operation_value = this.operation_value;
        this.testMaster.testTableDataDTOList[this.indexForModify].selected_options = this.selected_options;
        this.testMaster.testTableDataDTOList[this.indexForModify].apply_formula = this.apply_formula;
        this.testMaster.testTableDataDTOList[this.indexForModify].formula = this.formula;

        this.field_name_list[this.field_name_list.indexOf(existingField)] = this.field_name;

        this.toaster.success("Row Modified successfully");
        this.resetContentField();
      }
    }
  }

  //drag and drop of test table row
  drop(event: CdkDragDrop<string[]>) {

    this.resetContentField();
    moveItemInArray(this.testMaster.testTableDataDTOList, event.previousIndex, event.currentIndex);
    this.toaster.success("Row move to " + event.currentIndex + " position successfully");

  }
  subListDrop(event: CdkDragDrop<string[]>) {
    this.resetContentField();
    moveItemInArray(this.testMaster.testTableDataDTOList[this.subFieldTitleIdex].subFieldDataList, event.previousIndex, event.currentIndex);
    this.toaster.success("Row move to " + event.currentIndex + " position successfully");
  }

  isRowClickable(rowIndex: number): boolean {
    return this.testMaster.testTableDataDTOList[rowIndex].data_type == undefined;
  }

  openSUbFieldTable(i: number) {
    this.resetContentField();
    this.expanded[i] = !this.expanded[i];
    this.subfieldTableFlag = this.expanded[i];
    this.subFieldTitleIdex = i;
    this.subFieldDataList = this.testMaster.testTableDataDTOList[i].subFieldDataList;
  }

  createReportPdfData() {
    this.reportPdfList = [];
    for (var i = 0; i < this.testMaster.testTableDataDTOList.length; i++) {
      this.reportPdfList.push(this.testMaster.testTableDataDTOList[i]);
      if (this.testMaster.testTableDataDTOList[i].subFieldDataList.length > 0) {
        for (var j = 0; j < this.testMaster.testTableDataDTOList[i].subFieldDataList.length; j++) {
          this.reportPdfList.push(this.testMaster.testTableDataDTOList[i].subFieldDataList[j]);
        }
      }
    }
  }

  labObj = <LabObj>{};

  // this is IMP method
  makePdf() {
    let pdf = new jsPDF('p', 'pt', 'a4');
    pdf.setProperties({
      title: "Report"
    })
    pdf.setFontSize(9);
    pdf.text("PATIENT NAME", 40, 117);
    pdf.text(":", 125, 117);
    pdf.text("", 125, 117);

    pdf.setFontSize(8);
    pdf.text("AGE", 40, 133);
    pdf.text("GENDER", 40, 148);
    pdf.text("PID", 40, 163);
    pdf.text(":", 85, 133);
    pdf.text(":", 85, 148);
    pdf.text(":", 85, 163);

    pdf.text("", 95, 133);
    pdf.text("", 95, 148);
    pdf.text("", 95, 163);

    pdf.text("COLLECTION DATE", 310, 148);
    pdf.text("REFER BY", 310, 163);
    pdf.text(":", 400, 148);
    pdf.text(":", 400, 163);
    pdf.text("", 410, 148);
    pdf.text("", 410, 163);

    var v = pdf.getFont();

    pdf.setFontSize(10);
    pdf.setFont("Helvetica", "", "bold");
    if (this.testMaster.testCode != null && this.testMaster.testCode != "") {
      pdf.text(this.testMaster.testName + " (" + this.testMaster.testCode + ")", 297.5, 190, { align: "center" });
    }
    if (this.testMaster.testType == 'Table') {

      pdf.line(40, 200, 575, 200, "S");
      pdf.line(40, 220, 575, 220, "S");

      this.reportPdfList = [];
      for (var i = 0; i < this.testMaster.testTableDataDTOList.length; i++) {
        this.reportPdfList.push(this.testMaster.testTableDataDTOList[i]);
        if (this.testMaster.testTableDataDTOList[i].subFieldDataList && this.testMaster.testTableDataDTOList[i].subFieldDataList.length > 0) {
          for (var j = 0; j < this.testMaster.testTableDataDTOList[i].subFieldDataList.length; j++) {
            this.reportPdfList.push(this.testMaster.testTableDataDTOList[i].subFieldDataList[j]);
          }
        }
      }
      let reportTableList = [];

      for (var i = 0; i < this.reportPdfList.length; i++) {
        let list = [];
        if (this.reportPdfList[i].field_type != 'Sub Field') {
          list.push(this.reportPdfList[i].field_name);
        } else if (this.reportPdfList[i].field_type == 'Sub Field') {
          list.push("      " + this.reportPdfList[i].sub_field);
        }

        list.push("");
        list.push("");

        if (this.reportPdfList[i].range_from != "" && this.reportPdfList[i].range_to != "") {
          list.push(this.reportPdfList[i].range_from + "-" + this.reportPdfList[i].range_to);
        } else if (this.reportPdfList[i].range_from != "" && this.reportPdfList[i].range_to == "") {
          list.push(this.reportPdfList[i].range_from);
        } else if (this.reportPdfList[i].field_type != 'Title Field' && this.reportPdfList[i].range_from == "") {
          list.push("-");
        } else {
          list.push("");
        }

        if (this.reportPdfList[i].unit != "") {
          list.push(this.reportPdfList[i].unit);
        } else if (this.reportPdfList[i].unit == "" && this.reportPdfList[i].field_type != 'Title Field') {
          list.push("-");
        } else {
          list.push("");
        }
        reportTableList.push(list);

      }
      autoTable(pdf, {
        head: [['TEST DESCRIPTION', 'RESULT', 'FLAG', 'REF. RANGE', 'UNIT']],
        margin: { top: 200, right: 20, left: 40 },
        body: reportTableList,
        theme: "striped",
        headStyles: {
          fontSize: 8,
          fillColor: 220,
          textColor: 20,
        },
        bodyStyles: {
          fontSize: 9,
          textColor: 20,
        },
        alternateRowStyles: {
          fillColor: 255,
        },
        columnStyles: {
          2: { textColor: [196, 0, 0] }
        },
      })
    } else {
      let text: string = this.testMaster.testTextData;
      this.newTextContent = "<div style=\"width: 542px; font-size:10px;\" >" + text + "</div>";
      pdf.line(40, 200, 575, 200, "S");
      pdf.html(this.newTextContent, {
        callback: (pdf) => {
          pdf.setFontSize(8);
          var blob = pdf.output("blob");
          var usrl = window.URL.createObjectURL(blob);
          this.pdfurl = this.transform(usrl);
        },
        y: 205,
        x: 40
      })
    }
    pdf.setFontSize(10);
    pdf.text('Footer Text', pdf.internal.pageSize.width - 60, pdf.internal.pageSize.height - 15, { align: "center" });
    var labId = <number>new Number(sessionStorage.getItem("labId"));
    var labId = 1;
    this.labService.getLabsById(labId).subscribe(
      (r) => {
        this.labObj = <any>r;
        pdf.addImage(this.labObj.labLogoString, 40, 15, 60, 60);
        console.log(pdf.getFontList())
        pdf.setTextColor(3, 32, 252);
        pdf.setFont("Helvetica", "", "bold");
        pdf.setFontSize(14);
        pdf.text(this.labObj.labName, 120, 30);
        pdf.setFont("Helvetica", "", "normal");
        pdf.setFontSize(9);
        pdf.setTextColor(0, 0, 0);
        pdf.text(this.labObj.addLine + ", " + this.labObj.city_village + ", " + this.labObj.district, 120, 45);
        pdf.text(this.labObj.state + ", " + this.labObj.country + ", " + this.labObj.pincode, 120, 58);
        pdf.text("Mob No : " + this.labObj.mobileNumber + ", Email : " + this.labObj.emailId, 120, 70);

        var blob = pdf.output("blob");
        var usrl = window.URL.createObjectURL(blob);
        this.pdfurl = this.transform(usrl);
      })
  }

  transform(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  addNewTest() {
    var userId = <number>new Number(sessionStorage.getItem("mid"));
    let testMasterDTO = <TestMasterObj>{};
    this.testMaster.userId = <number>new Number(sessionStorage.getItem("mid"));
    this.testMaster.testTextData = this.newTextContent;
    this.testService.addNewTest(this.testMaster, userId).subscribe(
      (r) => {
        testMasterDTO = <any>r;
        this.toaster.success("Test Added Successfully");
        this.saveModal.nativeElement.click();
        this.loadAlltest();
      })
  }
  viewTest(id: number) {
    this.modifyModal = true;
    this.addmodal = false;
    this.modalTitle = "Test Details"
    this.ModalButtonName = "Proceed";
    this.testMaster = <TestMasterObj>{};
    this.testMaster.department = "";
    this.testMaster.testType = "";
    this.testMaster.testGender = "";
    this.testMaster.testGender = "";
    this.testMaster.sampleType = "";
    this.testMaster.testTableDataDTOList = [];
    this.resetContentField();
    this.subfieldTableFlag = false;
    this.subFieldTitleIdex = -1
    this.subFieldDataList = [];
    this.subFieldSelected = -1;
    this.selected_options = [];
    this.title_field_list = [];
    this.field_name_list = [];
    this.allTestList = [];
    this.newTextContent = "";

    let title_field_list: string[] = [];
    let field_name_list: string[] = [];

    this.testService.getTestById(id).subscribe(
      (r) => {
        this.testMaster = <any>(r)

        this.testMaster.testTableDataDTOList.forEach(function (field: any) {
          console.log(field);
          if (field.field_type == 'Title Field') {
            title_field_list.push(field.field_name);
            for (let sub of field.subFieldDataList) {
              if (sub.data_type == 'numeric') {
                field_name_list.push(sub.sub_field);
              }
            }
          } else {
            if (field.data_type === 'numeric') {
              field_name_list.push(field.field_name);
            }
          }
        });
        this.title_field_list = title_field_list;
        this.field_name_list = field_name_list;
      });
  }
  openTest(id: number) {
    this.modifyModal = true;
    this.addmodal = false;
    this.modalTitle = "Test Details"
    this.ModalButtonName = "Proceed";
    this.testMaster = <TestMasterObj>{};
    this.testMaster.department = "";
    this.testMaster.testType = "";
    this.testMaster.testGender = "";
    this.testMaster.testGender = "";
    this.testMaster.sampleType = "";
    this.testMaster.testTableDataDTOList = [];
    this.resetContentField();
    this.subfieldTableFlag = false;
    this.subFieldTitleIdex = -1
    this.subFieldDataList = [];
    this.subFieldSelected = -1;
    this.selected_options = [];
    this.title_field_list = [];
    this.field_name_list = [];
    this.allTestList = [];

    let title_field_list: string[] = [];
    let field_name_list: string[] = [];

    this.testService.getTestById(id).subscribe(
      (r) => {
        this.testMaster = <any>(r)

        this.testMaster.testTableDataDTOList.forEach(function (field: any) {
          console.log(field);
          if (field.field_type == 'Title Field') {
            title_field_list.push(field.field_name);
            for (let sub of field.subFieldDataList) {
              if (sub.data_type == 'numeric') {
                field_name_list.push(sub.sub_field);
              }
            }
          } else {
            if (field.data_type === 'numeric') {
              field_name_list.push(field.field_name);
            }
          }
        });
        this.title_field_list = title_field_list;
        this.field_name_list = field_name_list;
      });
  }
  modifyTest() {
    var userId = <number>new Number(sessionStorage.getItem("mid"));
    let testMasterDTO = <TestMasterObj>{};
    this.testService.updateTest(this.testMaster, userId).subscribe(
      (r) => {
        testMasterDTO = <any>r;
        this.toaster.success("Test Updated Successfully");
        this.saveModal.nativeElement.click();
        this.loadAlltest();
      })
  }
  setTestId(testId: number) {
    this.deleteTestId = testId;
  }
  deleteTest() {
    this.testService.deleteTestById(this.deleteTestId).subscribe(
      (r) => {
        let res = <any>r;
        this.toaster.success(res);
        this.OptionModal.nativeElement.click();
        this.loadAlltest();
      })
  }

  //formula methods 
  formula_list: any = [];
  mathButtonFlag: boolean = true;
  inputButtonFlag: boolean = false;


  addFieldInFormula(selectedField: string) {
    this.formula = this.formula + "" + selectedField;
    this.formula_list.push(selectedField);
    this.mathButtonFlag = false;
    this.inputButtonFlag = true
  }

  applyFormulaYes() {
    this.apply_formula = true;
  }
  applyFormulaNo() {
    this.apply_formula = false;
    this.formula = "";
  }

  addButtonInFormula() {
    this.formula = this.formula + " + ";
    this.formula_list.push(" + ");
    this.mathButtonFlag = true;
    this.inputButtonFlag = false;
  }
  minusButtonInFormula() {
    this.formula = this.formula + " - ";
    this.formula_list.push(" - ");
    this.mathButtonFlag = true;
    this.inputButtonFlag = false;
  }
  multilyButtonInFormula() {
    this.formula = this.formula + " * ";
    this.formula_list.push(" * ");
    this.mathButtonFlag = true;
    this.inputButtonFlag = false;
  }
  divideButtonInFormula() {
    this.formula = this.formula + " / ";
    this.formula_list.push(" / ");
    this.mathButtonFlag = true;
    this.inputButtonFlag = false;
  }
  openBracketButtonInFormula() {
    this.formula = this.formula + " ( "
    this.formula_list.push(" ( ");
    this.inputButtonFlag = false;

  }
  closeBracketButtonInFormula() {
    this.formula = this.formula + " ) "
    this.formula_list.push(" ) ");
    this.inputButtonFlag = false;
  }

  validateFormula() {
    this.createFormula();
    let formula = this.formula.trim();
    let requestMessage = {
      flag: false,
      message: formula
    }
    let responseMessage: {
      flag: boolean;
      message: string;
    }
    this.testService.validateFormula(requestMessage).subscribe(
      (r) => {
        responseMessage = <any>r;
        if (responseMessage.flag) {
          this.toaster.success(responseMessage.message);
          return true;
        } else {
          this.toaster.error(responseMessage.message);
          return false;
        }
      })
  }

  createFormula() {
    this.formula = "";
    let formula = "";
    this.formula_list.forEach(function (field: any) {
      formula = formula + field;
    });
    this.formula = formula;
  }
  removeLastElement() {
    let last = this.formula_list.pop();
    if (last == ' + ' || last == ' - ' || last == ' * ' || last == ' / ') {
      this.mathButtonFlag = false;
      this.inputButtonFlag = true;
    } else {
      this.mathButtonFlag = true;
      this.inputButtonFlag = false;
    }
    this.createFormula();
  }

}
