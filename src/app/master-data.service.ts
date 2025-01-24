import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MasterDataService {
  masterurl:string =environment.url+"/masterdata";

  constructor(private http : HttpClient) { }

  getAllState(){
    return this.http.get(`${this.masterurl}`+`/getAllState`);
  }
  getDistrictByStateCode(code:string){
    return this.http.get(`${this.masterurl}`+`/getDistrict/`+code);
  }
}
