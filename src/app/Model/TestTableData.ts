export interface TestTableData{
    entityId:number;
    sr_no:number;
    field_type:String;
    field_name:String;
    sub_field:String;
    data_type:String;
    unit:String;
    range:String;
    range_to:String;
    opertaion:String;
    operation_value:String;
    selected_options:[];
    apply_formula:String;
    formula:String;
    subFieldDataList:[{}]
}