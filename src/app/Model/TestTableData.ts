
export interface TestTableData{
    entityId:number;
    subFieldId:number;
    sr_no:number;
    field_type:string;
    field_name:string;
    sub_field:string;
    data_type:string;
    unit:string;
    range_from:string;
    range_to:string;
    opertaion:string;
    operation_value:string;
    selected_options:[];
    apply_formula:boolean;
    formula:string;
    subFieldDataList:TestTableData[]
}