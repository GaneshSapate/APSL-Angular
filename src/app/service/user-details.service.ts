import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  
  userDetailsUrl:string = environment.url+"/userDetails";
  constructor(private http:HttpClient) { }

  userDetailsByUserName(userName:string){
    return (this.http.get(`${this.userDetailsUrl}`+`/`+userName));
  }
}
