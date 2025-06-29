import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientTestMasterService {

  url: string = environment.url + "/patientTestMaster";
  
  constructor(private http: HttpClient) { }

  addPatientTestMasterEntry(obj: any) {
      return this.http.post(`${this.url}`, obj);
  }
}
