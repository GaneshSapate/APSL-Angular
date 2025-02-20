import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntryModalService {
  onButtonClick = new Subject();
  constructor() { }
}
