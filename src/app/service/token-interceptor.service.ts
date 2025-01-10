import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {  catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private route : Router,
              private toster : ToastrService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    let t = sessionStorage.getItem("token");
    let uid = sessionStorage.getItem("userId");
    let lid = sessionStorage.getItem("labId");
    let jwttoken = req.clone({
      setHeaders:{
        Authorization : "Bearer "+t,
        "UID":''+uid,
        "LID":''+lid,
        // "Access-Control-Allow-Origin" : 'http://localhost:4200/'
      },
      
    })
    return next.handle(jwttoken).pipe(
      catchError((requestError) => {
        if (requestError.status == 401) {
         this.toster.warning("Session May Be Ended Please Login Again");
         this.route.navigate(["/login"]);
        }else {
          this.toster.error(requestError.message);
        }
        return throwError(() => new Error(requestError));
      })
    );
  }
}
