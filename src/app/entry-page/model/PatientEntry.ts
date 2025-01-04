import { Patient } from "./Patient";

export interface PatientEntry{
entryId:number;
patientId:number;
labId:number;
status:string;
referById:number;
testCode:string;
remark:string;
addedDate:Date;
addedUserId:number;
modifiedDate:Date;
modifiedUserId:number;
patient:Patient;
}