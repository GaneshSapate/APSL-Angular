import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  userurl:string = environment.url+"/user";
  newUserurl:string = environment.url+"/newUserController";

  constructor(private userhttp:HttpClient) { }

  userRegistration(obj:any){
    return (this.userhttp.post(`${this.userurl}`+`/addUser`,obj,{responseType:'text'}));
  }

  getUserLogin(obj:any){
    return (this.userhttp.post(`${this.userurl}`+`/userLogin`,obj));
  }

  sentEmailOTP(obj:any){
    return (this.userhttp.post(`${this.userurl}`+`/userMailVerification`,obj,{responseType:'text'}));
  }

  sentMobileOTP(obj:any){
    return (this.userhttp.post(`${this.userurl}`+`/userMobileVerification`,obj,{responseType:'text'}));
  }
  verifyEmailOTP(obj:any){
    return (this.userhttp.post(`${this.userurl}`+`/userMailVerificationCallBack`,obj));
  }
  verifyMobileOTP(obj:any){
    return (this.userhttp.post(`${this.userurl}`+`/userMobileVerificationCallBack`,obj));
  }
  checkUser(user:string){
    return (this.userhttp.get(`${this.userurl}`+`/checkUserName/`+user));
  }

  getUserByUserName(user:string){
    return (this.userhttp.get(`${this.userurl}`+`/getUserForPasswordChange/`+user));
  }

  updateUserPassword(userName:string, userPassword:string){
    return (this.userhttp.get(`${this.userurl}`+`/updateUserPassword/`+userName+`/`+userPassword))
  }

  checkMobileNumberExist(mobileNumber:string){
    return (this.userhttp.get(`${this.userurl}`+`/checkMobileNumberExist/`+mobileNumber));
  }
  getUserAuthorities(){
    return (this.userhttp.get(`${this.userurl}`+`/getUserAuthorities/`));
  }
  getUserListByMasterUer(){
    return (this.userhttp.get(`${this.newUserurl}`+`/getUsers`));
  }
  getUserByUserId(obj:any){
    return (this.userhttp.post(`${this.newUserurl}`+`/getUserById`,obj));
  }
  updateUserByUserId(obj:any){
    return (this.userhttp.post(`${this.newUserurl}`+`/updateUserById`,obj));
  }
}
