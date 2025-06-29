export interface PatientTestMasterObj {
    ptmid: number;
    eid:number;
    userId: number;
    testName: string;
    testCode: string;
    addedDate: Date;
    addedUserId:number;
    modifiedDate: Date;
    modifiedUserId:number;
    testTextData: string;
    selectFlag:boolean;
    status:boolean;
    existingTest:boolean;
}