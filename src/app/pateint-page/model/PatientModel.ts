import { PatientEntry } from "src/app/entry-page/model/PatientEntry";

export interface Patient {
    patientId:number,
    labId: number,
    userId: number,
    title: string,
    firstName: string,
    middleName: string,
    lastName: string,
    gender: string,
    age: number,
    ageUnit: string,
    country: string,
    state: string,
    district: string,
    cityVillage: string,
    addressLine: string,
    pincode: number,
    mobileNo: string,
    emailId: string,
    addedDate: Date,
    addedUserId: number,
    modifiedDate: Date,
    modifiedUserId: number,
    patientEntryList:PatientEntry []
}