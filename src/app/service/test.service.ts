import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  testMasterUrl:string = environment.url+"/test";
  constructor(private http:HttpClient) { }

  addNewTest(obj:any,userId:number){
    return this.http.post(`${this.testMasterUrl}`+`/`+userId,obj);
  }
  updateTest(obj:any,userId:number){
    return this.http.put(`${this.testMasterUrl}`+`/`+userId,obj);
  }
  getTestById(id:number){
    return this.http.get(`${this.testMasterUrl}`+`/getTest/`+id);
  }
  getTestListById(userId:number){
    return this.http.get(`${this.testMasterUrl}`+`/`+userId);
  }
  deleteTestById(testId:number){
    return this.http.delete(`${this.testMasterUrl}`+`/`+testId,{responseType:'text'});
  }
  validateFormula(formula:any){
    return this.http.post(`${this.testMasterUrl}`+`/validateFormula`,formula);
  }
}
