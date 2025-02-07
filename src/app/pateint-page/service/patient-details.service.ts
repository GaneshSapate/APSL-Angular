import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientDetailsService {
  onButtonClick = new Subject();
  constructor() { }
}
