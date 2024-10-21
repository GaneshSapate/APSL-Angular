import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorServiceService {

  url:string=environment.doctorUrl;

  constructor(private http:HttpClient) { }

  addDoctor(doctor:any){
   return this.http.post(`${this.url}`,doctor);
  }
  getAlldoctorsByLabId(labId:number){
    return this.http.get(`${this.url}`+`/`+labId);
  }
}
