import { Doctor } from "src/app/Model/Doctor";
import { Patient } from "./Patient";

export interface PatientEntry{
entryId:number;
patientId:number;
labId:number;
status:string;
referBy:Doctor;
testCode:string;
remark:string;
addedDate:Date;
addedUserId:number;
modifiedDate:Date;
modifiedUserId:number;
patient:Patient;
}