export interface PatientTestMasterObj {
    testId: number;
    userId: number;
    modifiedBy: number;
    LabId: number;
    department: string;
    testName: string;
    testGender: string;
    testCode: string;
    testCost: string;
    sampleType: string;
    remark: string;
    testType: string;
    addedDate: Date;
    modifiedDate: Date;
    testTextData: string;
    selectFlag:boolean;
}