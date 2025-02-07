import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientEntryService {

  url: string = environment.url + "/patientEntry";
  
  constructor(private http: HttpClient) { }

  addPatientEntry(obj: any) {
    return this.http.post(`${this.url}`, obj);
  }
  updatePatientEntry(obj: any) {
    return this.http.put(`${this.url}`, obj);
  }
  getPatientEntryListByLabId(labId: number, pageNo: number, pageSize: number) {
    return this.http.get(`${this.url}` + `/` + labId + `/` + pageNo + `/` + pageSize);
  }
  getPatientEntryById(id: any) {
    return this.http.get(`${this.url}` + `/getPatientEntryById/` + id);
  }
  deletePatientEntryById(id: any) {
    return this.http.delete(`${this.url}` + `/` + id);
  }
}
