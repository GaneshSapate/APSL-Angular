export interface LoginUserResp{
    token:string,
    authstatus:string,
    mainUserId:number,
    labId:number,
    authorities:[{authority:string}],
    userRole:string,
    userId:number,
    accountType:string;
}