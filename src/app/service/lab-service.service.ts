import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LabServiceService {
  labUrl:string = environment.laburl;
  constructor(private http:HttpClient) { }

  addLab(labObj:any){
    return (this.http.post(`${this.labUrl}`,labObj));
  }
  getLabsByUserId(userId:number){
    return (this.http.get(`${this.labUrl}`+`/`+userId));
  }
  updateLab(labId:number ,labObj:any){
    return (this.http.put(`${this.labUrl}`+`/`+labId,labObj));
  }
  changeStatus(labId:number,status:boolean){
    return (this.http.get(`${this.labUrl}`+`/changeStatus/`+labId +`/`+status,))
  }
  getLabsById(labId:number){
    return (this.http.get(`${this.labUrl}`+`/fetchLabById/`+labId));
  }
}
