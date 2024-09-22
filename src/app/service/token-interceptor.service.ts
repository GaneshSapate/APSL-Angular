import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    let t = sessionStorage.getItem("token");
    console.log(t);
    let jwttoken = req.clone({
      setHeaders:{
        Authorization : "Bearer "+t
      }
    })
    return next.handle(jwttoken);
  }
}
