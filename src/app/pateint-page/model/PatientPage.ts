import { Patient } from "./PatientModel";

export interface PatientPage{
    content:Patient[],
    empty:boolean,
    first:boolean,
    last:boolean,
    number:number,
    numberOfElements:number,
    size:number,
    totalElements:number,
    totalPages:number
}