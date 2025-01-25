import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/Model/User';
import { ErrorObj } from 'src/app/Model/ErrorObj';
import { MasterDataService } from 'src/app/master-data.service';
import { UtilServiceService } from 'src/app/service/util-service.service';
import { Authorities } from './Model/Authorities';
import {Directive, HostListener} from "@angular/core";
import { UserServiceService } from 'src/app/user-service.service';
import { LabServiceService } from 'src/app/service/lab-service.service';
import { LabObj } from 'src/app/Model/LabObj';
import { LabCheckList } from './Model/LabCheckList';
import { UserIdDTO } from 'src/app/Model/UserIdDTO';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {


  stateList = [{ id: 0, code: "", discription: "" }];
  districtList = [{ id: 0, stateCode: "", discription: "" }];

  p:number=1;

  modalHeader: string = "";
  modalType: string = "";

  userObj = <User>{};
  UsersList:User[]=[];

  authorities:Authorities[]=[];
  selectedAuthorities:string[]=[];

  labList:LabCheckList[]=[];
  selectedLabList:LabCheckList[]=[];

  @ViewChild('dropdownButton') dropdown: ElementRef<HTMLElement> | undefined;
  @ViewChild('dropdownButtonclose') dropdownclose: ElementRef<HTMLElement> | undefined;

  @ViewChild('labdropdownButton') labdropdown:ElementRef<HTMLElement> | undefined;
  @ViewChild('labdropdownButtonclose') labdropdownclose: ElementRef<HTMLElement> | undefined;

  @ViewChild('closeUserModel') closeUserModel:any;

  errorObj={
    ErrorMessage: "",
    TimeStamp: ""
  }
  matchResponse={
    match:"",
    errorMessage:""
  }
  
  constructor(private toaster: ToastrService,
    private router: Router,private masterService: MasterDataService,
    private utilsService:UtilServiceService,
    private userService:UserServiceService,
    private labService: LabServiceService,
  ) { }

  ngOnInit(): void {
    this.fetchStateList();
    this.getUserList();
  }
  fetchStateList(){
    this.masterService.getAllState().subscribe(
      (r)=>{
        this.stateList = <any>r;
      })
  }

  onSelectState() {
    this.districtList=[];
    if(this.userObj.userState ){
      this.masterService.getDistrictByStateCode(this.userObj.userState).subscribe(
        (result)=>{
          this.districtList = <any> result;
          this.userObj.userDistrict=this.userObj.userDistrict;
      })
    }
    
  }
  getUserList(){
    this.userService.getUserListByMasterUer().subscribe((s)=>{
      this.UsersList= <any>s;
    })
  }
  viewUser(userId: any) {
    this.userObj=<User>{};
    let obj= <UserIdDTO>{};
    obj.userId=userId
    this.userService.getUserByUserId(obj).subscribe((result)=>{
      this.userObj=<any>result;
      this.onSelectState();
      this.selectedAuthorities=this.userObj.userAuthorities;
      this.labList=[<LabCheckList>{}];
      let selectedLabList:number[]=this.userObj.labIds;
      var userId = <number> new Number(sessionStorage.getItem("mainUserId"));
      let labList1:LabObj[]=[];
      this.labService.getLabsByUserId(userId).subscribe(
        (r)=>{
          labList1=<any>r;
          let newlabList:LabCheckList[]=[];
          labList1.forEach(function (value){
            let newlabCheckObj=<LabCheckList>{};
            newlabCheckObj.labId=value.labId;
            newlabCheckObj.LabName=value.labName;
            if(selectedLabList != null && selectedLabList.indexOf(newlabCheckObj.labId)!=-1){
              newlabCheckObj.check=true;
            }else{
              newlabCheckObj.check=false;
            }
            newlabList.push(newlabCheckObj);
          });
          this.labList=newlabList;
        })
    })
   

  }

  addUserModal() {
    this.modalHeader="Add user"
    this.modalType="Add";
    this.userObj=<User>{};
    this.selectedAuthorities=[];
    this.userObj.title="";
    this.userObj.userState="";
    this.userObj.gender="";
    this.userObj.userState="";
    this.userObj.userDistrict="";
    this.userObj.userCountry="";
    this.userObj.userRole="User";
    this.labList=[<LabCheckList>{}];
    this.utilsService.getUserAuthorities().subscribe((r)=>{
      let list=<any>r;
      this.selectedAuthorities.push(list[0]);
    })
    var userId = <number> new Number(sessionStorage.getItem("mainUserId"));
    let labList1:LabObj[]=[];
    this.labService.getLabsByUserId(userId).subscribe(
      (r)=>{
        labList1=<any>r;
        let newlabList:LabCheckList[]=[];
        let num=1;
        labList1.forEach(function (value){
          let newlabCheckObj=<LabCheckList>{};
          newlabCheckObj.labId=value.labId;
          newlabCheckObj.LabName=value.labName;
          if(num==1){
            newlabCheckObj.check=true;
            num=0;
          }else{
            newlabCheckObj.check=false;
          }
          newlabList.push(newlabCheckObj);
        });
        this.labList=newlabList;
      })
  }
  modifyUserModal(userId: any) {
    this.modalHeader="Modify user"
    this.modalType="Modify";
    this.userObj=<User>{};
    let obj= <UserIdDTO>{};
    obj.userId=userId
    this.userService.getUserByUserId(obj).subscribe((result)=>{
      this.userObj=<any>result;
      this.onSelectState();
      this.selectedAuthorities=this.userObj.userAuthorities;
      this.labList=[<LabCheckList>{}];
      let selectedLabList:number[]=this.userObj.labIds;
      var userId = <number> new Number(sessionStorage.getItem("mainUserId"));
      let labList1:LabObj[]=[];
      this.labService.getLabsByUserId(userId).subscribe(
        (r)=>{
          labList1=<any>r;
          let newlabList:LabCheckList[]=[];
          labList1.forEach(function (value){
            let newlabCheckObj=<LabCheckList>{};
            newlabCheckObj.labId=value.labId;
            newlabCheckObj.LabName=value.labName;
            if(selectedLabList != null && selectedLabList.indexOf(newlabCheckObj.labId)!=-1){
              newlabCheckObj.check=true;
            }else{
              newlabCheckObj.check=false;
            }
            newlabList.push(newlabCheckObj);
          });
          this.labList=newlabList;
        })
    })
   
  }
  clickonBack() {
    this.router.navigate(['dashboard/master']);
  }
  deleteModal(arg0: any) {
    
  }


  deleteUser() {
    
  }
  addUser() {
    this.userObj.userPasswordType="default";
    this.userObj.userPassword="password";
    this.userObj.userAuthorities=this.selectedAuthorities;
    var mainUserId = new Number(sessionStorage.getItem("mainUserId"));
    console.log(mainUserId);
    this.userObj.parentUserId = <number>mainUserId;
    let labIdList:number[]=[];
    this.labList.forEach(function(value){
      if(value.check){
        labIdList.push(value.labId);
      }
    })
    this.userObj.labIds=labIdList;
    this.userObj.userStatus="Active"
    this.userObj.userRegestrationDate=new Date;
    this.userService.checkUser(this.userObj.userName)
    .subscribe((r)=>{
      this.matchResponse = (<any>r);
      if(this.matchResponse.match == 'Y'){
        this.toaster.error(this.userObj.userName+" user Name is taken, please choose another !"); 
      }else{
        this.userService.userRegistration(this.userObj).subscribe({
          next: (r) => {
            let s = <string>r
            this.toaster.success(s);
            if (this.closeUserModel) {
              this.closeUserModel.nativeElement.click();
            }
            this.getUserList();
          }
        })
      }
    });
    
  }

  modifyUser() {
    this.userObj.userAuthorities=this.selectedAuthorities;
    let labIdList:number[]=[];
    this.labList.forEach(function(value){
      if(value.check){
        labIdList.push(value.labId);
      }
    })
    this.userObj.labIds=labIdList;
    this.userObj.userModificationDate=new Date;
    this.userService.updateUserByUserId(this.userObj).subscribe({
      next: (r) => {
        let s = <User>r
        this.toaster.success("User "+ s.userName+" updated successfully");
        if (this.closeUserModel) {
          this.closeUserModel.nativeElement.click();
        }
        this.getUserList();
      }
    })
  }

  onClickSelectedAuthorities(){
    let Authorities: Authorities[]=[];
    let selected =this.selectedAuthorities;
    this.utilsService.getUserAuthorities().subscribe((r)=>{
      let list=<any>r;
      list.forEach(function (value:string){
        let auth=<Authorities>{};
        auth.auth=value;
        let index = -1;
        if(selected!=null){
          index=selected.indexOf(value);
        }
        if(index>-1){
          auth.check=true;
        }
        Authorities.push(auth);
      });
    this.authorities=Authorities;
    if(this.dropdown){
      this.dropdown.nativeElement.click();
    }
    })
  }

  checkBoxCheck(event:any,str:string) {
    if(this.selectedAuthorities==null){
      this.selectedAuthorities=[];
    }
    if(event.target.checked){
      this.selectedAuthorities.push(str);
    }else{
      let index=this.selectedAuthorities.indexOf(str);
      this.selectedAuthorities.splice(index,1);
    }
  }
  onRemove(i:number,event:any){
    event.stopPropagation();
    this.selectedAuthorities.splice(i,1);
    if(this.dropdownclose){
      this.dropdownclose.nativeElement.click();
    }
   
  }

  onClickSelectedLab(){
    this.utilsService.getUserAuthorities().subscribe((r)=>{
      if(this.labdropdown){
        this.labdropdown.nativeElement.click();
      }
    })
  }

  labCheckBoxCheck(event:any,index:number) {
    if(event.target.checked){
      this.labList[index].check=true;
    }else{
      this.labList[index].check=false;
    }
  }
  onRemoveLab(index:number,event:any){
    event.stopPropagation();
    this.labList[index].check=false;
    if(this.labdropdownclose){
      this.labdropdownclose.nativeElement.click();
    }
  }

  userNameExistCheck(f:any){
    if(this.modalType==="Add" &&  this.userObj.userName.length !=null && this.userObj.userName.length>4){
      this.userService.checkUser(this.userObj.userName)
      .subscribe((r)=>{
        this.matchResponse = (<any>r);
        if(this.matchResponse.match === "Y"){
          this.toaster.error("Username already exist !"); 
          f.valid=false;
        }
      });
    }
  }

}



@Directive({
    selector: "[stop-event-propagation]"
})
export class StopEventPropagation
{
    @HostListener("click", ["$event"])
    public onClick(event: any): void
    {
        event.stopPropagation();
    }
}
