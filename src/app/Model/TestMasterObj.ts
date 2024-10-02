import { TestTableData } from "./TestTableData";

export interface TestMasterObj{
    testId:number;
    userId:number;
    modifiedBy:number;
    LabId:number;
    department:string;
    testName:string;
    testGender:string;
    testCode:string;
    testCost:string;
    sampleType:string;
    remark:string;
    testType:string;
    testTableDataDTOList:TestTableData[];
    addedDate:Date;
    modifiedDate:Date;
}