import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  
  url: string = environment.url + "/patient";

  constructor(private http: HttpClient) { }

  addPatient(obj: any) {
    return this.http.post(`${this.url}`, obj);
  }
  updatePatient(obj: any) {
    return this.http.put(`${this.url}`, obj);
  }
  getPatientListByLabId(labId: number, pageNo: number, pageSize: number) {
    return this.http.get(`${this.url}` + `/` + labId + `/` + pageNo + `/` + pageSize);
  }
  getPatientWithEntryById(id: any) {
    return this.http.get(`${this.url}` + `/getPatientWithEntryById/` + id);
  }
  deletePatientById(id: any) {
    return this.http.delete(`${this.url}` + `/` + id);
  }
  searchPatientByNameOrMRN(name: string) {
    return this.http.get(`${this.url}` + `/searchPatientByNameOrMRN/` + name);
  }

}
