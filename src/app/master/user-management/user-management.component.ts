import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/Model/User';
import { ErrorObj } from 'src/app/Model/ErrorObj';
import { MasterDataService } from 'src/app/master-data.service';
import { UtilServiceService } from 'src/app/service/util-service.service';
import { Authorities } from './Model/Authorities';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {


  stateList = [{ id: 0, code: "", discription: "" }];
  districtList = [{ id: 0, stateCode: "", discription: "" }];
  errorObj = <ErrorObj>{};

  p:number=1;

  modalHeader: string = "";
  modalType: string = "";

  userObj = <User>{};

  authorities:Authorities[]=[];
  selectedAuthorities:string[]=[];

  @ViewChild('dropdownButton') dropdown: ElementRef<HTMLElement> | undefined;
  @ViewChild('dropdownButtonclose') dropdownclose: ElementRef<HTMLElement> | undefined;;
  @ViewChild('closeUserModel') closeUserModel:any;
  
  constructor(private toaster: ToastrService,
    private router: Router,private masterService: MasterDataService,
    private utilsService:UtilServiceService
  ) { }

  ngOnInit(): void {
    this.fetchStateList();
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


  modifyUserModal(arg0: any) {
    throw new Error('Method not implemented.');
  }
  viewUser(arg0: any) {
    throw new Error('Method not implemented.');
  }
  UsersList: any;

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
  }
  clickonBack() {
    this.router.navigate(['dashboard/master']);
  }
  deleteModal(arg0: any) {
    throw new Error('Method not implemented.');
  }


  deleteUser() {
    throw new Error('Method not implemented.');
  }
  modifyUser() {
    throw new Error('Method not implemented.');
  }
  addUser() {
    throw new Error('Method not implemented.');
  }

  onClickSelectedAuthorities(){
    let Authorities: Authorities[]=[];
    let selected =this.selectedAuthorities;
    this.utilsService.getUserAuthorities().subscribe((r)=>{
      let list=<any>r;
      list.forEach(function (value:string){
        let auth=<Authorities>{};
        auth.auth=value;
        let index=selected.indexOf(value);
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
    console.log(event.target.checked+" , "+str);
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

}


import {Directive, HostListener} from "@angular/core";

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
