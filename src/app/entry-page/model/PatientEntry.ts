import { Doctor } from "src/app/Model/Doctor";
import { Patient } from "./Patient";
import { PatientTestMasterObj } from "./PatientTestMasterObj";

export interface PatientEntry{
entryId:number;
labId:number;
status:string;
doctor:Doctor;
testCode:PatientTestMasterObj[];
remark:string;
addedDate:Date;
addedUserId:number;
modifiedDate:Date;
modifiedUserId:number;
patient:Patient;
modifyPatient:boolean;
}