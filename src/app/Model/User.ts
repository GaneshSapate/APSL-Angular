import { GrantedAuthority } from "./GrantedAuthority";

export interface User{
userId:number;
title:string
userFirstName:string;
userLastName:string;
userName:string;
userPassword:string;
userMailId:string;
userMobileNumber:string;
userRegestrationDate:Date;
userRole:string;
parentUserId:number;
userAuthorities:GrantedAuthority[];
userAddressLine:string;
userCityOrVillage:string;
userPincode:number;
userDistrict:string;
userState:string;
userCountry:string;
userStatus:string;
gender:string
}