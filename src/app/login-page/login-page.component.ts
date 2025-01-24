import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserServiceService } from '../user-service.service';
import { NgForm,NgModel,ReactiveFormsModule } from '@angular/forms';
import { LoginUserOBJ } from '../Model/LoginUserOBJ';
import { LoginUserResp } from '../Model/LoginUserRes';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LabServiceService } from '../service/lab-service.service';
import { LabObj } from '../Model/LabObj';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginUserOBJ=<LoginUserOBJ>{};
  incorrect:string = '';
  incorrectUser:string="";
  userName:string="";
  userLastName:string="";
  userFirstName:string="";
  mailId:string="";
  mobileNumber:string="";
  userPassword:string="";
  confirmUserPassword:string="";

  showUserInfo:boolean=false;
  ProccedToVerification:boolean=true;
  disabledMobileVerifyButton:boolean=true;
  mobileOTPInputField:boolean=true;
  disabledEmailOTPSendButton:boolean=true;
  disabledEmailVerifyButton:boolean = true;
  emailOTPInputField:boolean=true;
  disabledProceedButon:boolean=true;
  passwordSubmit:boolean=true;

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

  confirmPasswordshow:string="password";
  passwordShowButton:string="show";

  verificationResponse={
    match:"",
    message:""
  }
  matchResponse={
    match:"",
    errorMessage:""
  }

  user={
    UserFound:false,
    userName :"",
    userFirstName:"",
    userLastName:"",
    userMobileNumber:"",
    userMailId:""
  }

  weakPassword:string = "";
  goodPassword:string="";
  confirmPasswordNoMatch:string =""; 
  confirmPasswordMatch:string="";

  UserPasswordUpdateVO={
    updateflag:false,
    errorMessage:""
  }
  message:string="";

  labList=[<LabObj>{}];
  
  constructor(private title:Title,
                private service:UserServiceService,
                private toster:ToastrService,
                private labService: LabServiceService,
                private router:Router) { }
  
  ngOnDestroy(): void {
    document.body.className='';
  }
  ngOnInit(): void {
    this.title.setTitle('Login')
   // document.body.className="bg_background";
  }

  onLogin(f:NgForm){
    this.service.getUserLogin(this.loginUserOBJ).subscribe({
      next:(r)=>{
        var UserResp = <LoginUserResp>{};
        UserResp = (<any>r);
        console.log(UserResp);
        sessionStorage.setItem("token",UserResp.token);
        if(UserResp.mainUserId === 0 && UserResp.userRole === "MAIN_USER") {
          sessionStorage.setItem("mainUserId",UserResp.userId.toString());
        }else{
          sessionStorage.setItem("mainUserId",UserResp.mainUserId.toString());
        }
        sessionStorage.setItem("labId",UserResp.labId.toString());
        sessionStorage.setItem("userId",UserResp.userId.toString());
        sessionStorage.setItem("userRole",UserResp.userRole);
        this.labService.getLabsByUserId(UserResp.userId).subscribe(
          (r)=>{
            this.labList=<any>r;
            if(this.labList.length>1){
              this.router.navigate(["selectLab"]);
            }else{
              sessionStorage.setItem("labId",this.labList[0].labId.toString());
              this.router.navigate(["/dashboard/home"]); 
            }
          })
      },
      error(err) {
      //  console.log(JSON.stringify(err));
      }
    })
  }
  getAllLabs(){
    var userId = <number> new Number(sessionStorage.getItem("mainUserId"));
    this.labService.getLabsByUserId(userId).subscribe(
      (r)=>{
        console.log(r);
        this.labList=<any>r;
      })
  }

  clickOnCancel(){
    this.showUserInfo = false;
    this.ProccedToVerification=true;
    this.disabledMobileVerifyButton=true;
    this.mobileOTPInputField=true;
    this.disabledEmailOTPSendButton=true;
    this.disabledEmailVerifyButton = true;
    this.emailOTPInputField=true;
    this.disabledProceedButon=true;
    this.passwordSubmit=true;

    this.mobileVerificationFlag=false;
    this.emailVerificationFlag = false;
    this.mobileOTPSent = "";
    this.emailOTPSent = "";
    this.incorrectUser = "";
    this.incorrect = "";
    this.mOTPincorrect="";
    this.mOTPcorrect="";
    this.userPassword="";
    this.confirmUserPassword="";

    this.userLastName="";
    this.userFirstName="";
    this.mailId="";
    this.mobileNumber="";

  
    this.eOTPincorrect="";
    this.eOTPcorrect="";

    this.weakPassword = "";
    this.goodPassword="";
    this.confirmPasswordNoMatch =""; 
    this.confirmPasswordMatch="";
    
    this.confirmPasswordshow="password";
    this.passwordShowButton="show";

    this.mobileOTP= undefined;
    this.emailOTP = undefined;

  }

  onSearch(){
    this.clickOnCancel();
    if(this.userName.length>1){
      this.service.getUserByUserName(this.userName)
      .subscribe((r)=>{
        this.user = (<any>r);
        if(this.user.UserFound){
          this.incorrectUser = "";
          this.userName = this.user.userName;
          this.userFirstName = this.user.userFirstName;
          this.userLastName = this.user.userLastName;
          this.mobileNumber = this.user.userMobileNumber;
          this.mailId = this.user.userMailId;
          this.showUserInfo = true;
          this.ProccedToVerification=false;
        }else{
          this.incorrectUser = "User Not Found !";
          this.showUserInfo = false;
          this.ProccedToVerification=true;
        }
      });
    }else{
      this.incorrectUser = "Please Enter Minimum 2 character";
      this.showUserInfo = false;
      this.ProccedToVerification=true;
    }
    
  }


  onMobileOTPSend(){
    let obj={
       userFirstName:this.userFirstName,
       userLastName:this.userLastName,
       mobileNumber:"+91"+this.mobileNumber
     }
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
       mobileNumber:"+91"+this.mobileNumber,
       verificationOTP:+otp
     }
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

   onUserPasswordChange(pass:string,confPassword:string){
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/; 
    if(!regex.test(pass)){
      this.goodPassword="";
      this.weakPassword="Weak Password";
      if(this.confirmPasswordMatch != "" || this.confirmPasswordNoMatch !=""){
        this.onUserConfPasswordChange(pass,confPassword);
      }
    }else{
      this.weakPassword="";
      this.goodPassword = "Good Password";
      if(this.confirmPasswordMatch != "" || this.confirmPasswordNoMatch !=""){
        this.onUserConfPasswordChange(pass,confPassword);
      }
    }
   }
   onUserConfPasswordChange(pass:string,confPassword:string){
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/; 
    if(confPassword == pass && regex.test(confPassword)){
      this.confirmPasswordNoMatch="";
      this.confirmPasswordMatch="Password Match";
      this.passwordSubmit=false;
    }else{
      this.confirmPasswordMatch="";
      this.confirmPasswordNoMatch="No Match";
      this.passwordSubmit=true;
    }

   }
   showPassword(){
    if(this.confirmPasswordshow == "password"){
      this.passwordShowButton="hide";
      this.confirmPasswordshow = "input";
    }else{
      this.passwordShowButton="show";
      this.confirmPasswordshow = "password";
    }

   }
   onPasswordChange(){
    if(this.userPassword!=null && this.userName !=null){
      this.service.updateUserPassword(this.userName,this.userPassword)
      .subscribe((r)=>{
        this.UserPasswordUpdateVO = (<any>r);
        if(this.UserPasswordUpdateVO.updateflag == true){
          this.message = this.UserPasswordUpdateVO.errorMessage;
          let popUp=document.getElementById("openModalButton");
          if(popUp!=null){
            popUp.click();
          }
        }
        else{
          this.message = this.UserPasswordUpdateVO.errorMessage;
          let popUp=document.getElementById("openModalButton");
          if(popUp!=null){
            popUp.click();
          }
        }
      })
    }


   }

}
