import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  disabledMobileVerifyButton:boolean=true;
  mobileOTPInputField:boolean=true;
  disabledEmailOTPSendButton:boolean=true;
  disabledEmailVerifyButton:boolean = true;
  emailOTPInputField:boolean=true;
  disabledProceedButon:boolean=true;


  userLastName:string="";
  userFirstName:string="";
  userGender:string="";
  mailId:string="";
  mobileNumber:string="";

  message:string="";

  userName:string=""
  userPassword:string="";
  confirmUserPassword:string="";

  verificationResponse={
    match:"",
    message:""
  }
  matchResponse={
    match:"",
    errorMessage:""
  }

  mobileOTP:number | undefined;
  emailOTP:number | undefined;

  mobileOTPSent:string = "";
  emailOTPSent:string = "";

  mOTPincorrect:string="";
  mOTPcorrect:string="";

  eOTPincorrect:string="";
  eOTPcorrect:string="";

  closeButtonFlag:boolean=false;
  mobileVerificationFlag:boolean =false;
  emailVerificationFlag:boolean=false;


  errorObj={
    ErrorMessage: "",
    TimeStamp: ""
  }

  mobileNumberError:string="";
  mobileNumberOk:string="";
  emailError:string="";
  userNameError:string = "";

  confirmPasswordshow:string="password";
  passwordShowButton:string="fa-regular fa-eye";
  weakPassword:string="";
  goodPassword:string="";
  confirmPasswordNoMatch:string="";
  confirmPasswordMatch:string="";

  nextButton:boolean=true;

  constructor(private service:UserServiceService) { }

  ngOnInit(): void {

  }


  nextButtonValidation(){
    if(this.mobileNumberError == "" && this.emailError == "" &&
        this.confirmPasswordNoMatch == "" && this.weakPassword == "" &&
        this.userNameError == "" ){
          this.nextButton =false;
    }else{
      this.nextButton = true;
    }
  }

  mobileExist(){
    let regex = /^[6-9]\d{9}$/;
      if(regex.test(this.mobileNumber)){
        this.service.checkMobileNumberExist(this.mobileNumber)
        .subscribe((r)=>{
          this.matchResponse = (<any>r);
          if(this.matchResponse.match=="Y"){
            this.mobileNumberError = "Mobile number is already tekan";
            this.nextButtonValidation();
          }else{
            this.mobileNumberError = "";
            this.nextButtonValidation();
          }
        });
      }else{
          this.mobileNumberError="Please enter valid Mobile Number";
          this.nextButtonValidation();
      }
  }

  userEmailValidation(){
    let regax = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    if(!regax.test(this.mailId)){
      this.emailError = "Please enter valid email";
      this.nextButtonValidation();
    }else{
      this.emailError = "";
      this.nextButtonValidation();
    }
  }
  userExist(){
    if(this.userName.length>4){
      this.service.checkUser(this.userName)
      .subscribe((r)=>{
        this.matchResponse = (<any>r);
        if(this.matchResponse.match == 'Y'){
          this.userNameError = "User Name is taken";
          this.nextButtonValidation();
        }else{
          this.userNameError="";
        }
      });
    }else{
      this.userNameError = "UserName Should be more than 4 character";
      this.nextButtonValidation();
    }
    
  }

  onMobileOTPSend(){
   let obj={
      userFirstName:this.userFirstName,
      userLastName:this.userLastName,
      mobileNumber:this.mobileNumber
    }
    console.log(obj);
    this.service.sentMobileOTP(obj)
    .subscribe((r)=>{
      this.mobileOTPSent=(<any>r);
      this.disabledMobileVerifyButton=false;
      this.mobileOTPInputField=false;
    });

  }
  onEmailOTPSend(){
   let obj={
      userFirstName:this.userFirstName,
      userLastName:this.userLastName,
      mailId:this.mailId
    }
    console.log(obj);
    this.service.sentEmailOTP(obj)
    .subscribe((r)=>{
      this.emailOTPSent=(<any>r);
      this.disabledEmailVerifyButton=false;
      this.emailOTPInputField=false;
    });
  }


  onMobileOTPVerify(otp:string){
   let obj={
      userFirstName:this.userFirstName,
      userLastName:this.userLastName,
      mobileNumber:this.mobileNumber,
      verificationOTP:+otp
    }
    console.log(obj);
    this.service.verifyMobileOTP(obj)
    .subscribe((r)=>{
      this.verificationResponse=(<any>r);
      if(this.verificationResponse.match == 'Y'){
        this.mOTPincorrect="";
        this.mobileOTPSent="";
        this.mOTPcorrect= this.verificationResponse.message;
        this.mobileVerificationFlag=true;
        this.disabledEmailOTPSendButton=false;
      }else{
        this.mobileOTPSent="";
        this.mOTPcorrect="";
        this.mOTPincorrect= this.verificationResponse.message;
       
      }
    });

  }
  onEmailOTPVerify(otp:string){
    let obj={
       userFirstName:this.userFirstName,
       userLastName:this.userLastName,
       mailId:this.mailId,
       verificationOTP:+otp
     }
     console.log(obj);
     this.service.verifyEmailOTP(obj)
     .subscribe((r)=>{
       this.verificationResponse=(<any>r);
       if(this.verificationResponse.match == 'Y'){
        this.eOTPincorrect="";
        this.emailOTPSent="";
        this.eOTPcorrect= this.verificationResponse.message;
        this.emailVerificationFlag=true;
        this.disabledProceedButon=false;
      }else{
        this.emailOTPSent="";
        this.eOTPcorrect="";
        this.eOTPincorrect= this.verificationResponse.message;
      }
     });
  }

  onClickNext(){
    
  
  }


  clickOnCancel(){

    this.disabledMobileVerifyButton=true;
    this.mobileOTPInputField=true;
    this.disabledEmailOTPSendButton=true;
    this.disabledEmailVerifyButton = true;
    this.emailOTPInputField=true;
    this.disabledProceedButon=true;

    this.mobileVerificationFlag=false;
    this.emailVerificationFlag = false;
    this.mobileOTPSent = "";
    this.emailOTPSent = "";
  
    this.mOTPincorrect="";
    this.mOTPcorrect="";
  
    this.eOTPincorrect="";
    this.eOTPcorrect="";

    this.mobileOTP= undefined;
    this.emailOTP = undefined;

  }

  onSubmit(f:any){

    this.disabledMobileVerifyButton=true;
    this.mobileOTPInputField=true;
    this.disabledEmailOTPSendButton=true;
    this.disabledEmailVerifyButton = true;
    this.emailOTPInputField=true;
    this.disabledProceedButon=true;

    this.mobileVerificationFlag=false;
    this.emailVerificationFlag = false;
    this.mobileOTPSent = "";
    this.emailOTPSent = "";
  
    this.mOTPincorrect="";
    this.mOTPcorrect="";
  
    this.eOTPincorrect="";
    this.eOTPcorrect="";

    this.mobileOTP= undefined;
    this.emailOTP = undefined;
  }


  onUserPasswordChange(pass:string,confPassword:string){
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/; 
    if(!regex.test(pass)){
      this.goodPassword="";
      this.weakPassword="Weak Password";
      if(this.confirmPasswordMatch != "" || this.confirmPasswordNoMatch !=""){
        this.onUserConfPasswordChange(pass,confPassword);
      }
      this.nextButtonValidation();
    }else{
      this.weakPassword="";
      this.goodPassword = "Good Password";
      if(this.confirmPasswordMatch != "" || this.confirmPasswordNoMatch !=""){
        this.onUserConfPasswordChange(pass,confPassword);
      }
      this.nextButtonValidation();
    }
   }
   onUserConfPasswordChange(pass:string,confPassword:string){
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/; 
    if(confPassword == pass && regex.test(confPassword)){
      this.confirmPasswordNoMatch="";
      this.confirmPasswordMatch="Password Match";
      this.nextButtonValidation();
    }else{
      this.confirmPasswordMatch="";
      this.confirmPasswordNoMatch="No Match";
      this.nextButtonValidation();
    }

   }
   showPassword(){
    if(this.confirmPasswordshow == "password"){
      this.passwordShowButton="fa-regular fa-eye-slash";
      this.confirmPasswordshow = "input";
    }else{
      this.passwordShowButton="fa-regular fa-eye";
      this.confirmPasswordshow = "password";
    }
  }

  onClickProceed(){
    if(this.mobileVerificationFlag == false && this.emailVerificationFlag == false){
      this.message = "Registartion is not Successfull!";
      let popUp=document.getElementById("openModalButton");
        if(popUp!=null){
          popUp.click();
        }
    }else{
      let obj = {
        "userFirstName" : this.userFirstName,
        "userLastName" : this.userLastName,
        "userMobileNumber":this.mobileNumber,
        "userMailId": this.mailId,
        "userGender": this.userGender,
        "userCreatedDate" : null,
        "userName":this.userName,
        "userPassword":this.userPassword 
      }
      this.service.userRegistration(obj)
      .subscribe({
        next:(r)=>{
        this.message=(<any>r);
        let popUp=document.getElementById("openModalButton");
        if(popUp!=null){
          popUp.click();
        }
        },
        error:(e)=>{
          this.errorObj=(<any>e);
          this.message=this.errorObj.ErrorMessage;
          let popUp=document.getElementById("openModalButton");
          if(popUp!=null){
            popUp.click();
          }
        }
      });
    }

  }
}
