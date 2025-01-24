import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilServiceService {
  utilsUrl:string = environment.url+"/utils";
  constructor(private http:HttpClient) { }

  getUserAuthorities(){
    return (this.http.get(`${this.utilsUrl}`+`/getUserAuthorities`));
  }
}
