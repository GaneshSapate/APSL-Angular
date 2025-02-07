import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {  catchError, Observable, tap, throwError, timeout } from 'rxjs';

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
    let mid = sessionStorage.getItem("mid");
    let account_type = sessionStorage.getItem("account_type");
    let jwttoken = req.clone({
      setHeaders:{
        Authorization : "Bearer "+t,
        "UID":''+uid,
        "LID":''+lid,
        "MID":''+mid,
        "account_type": ''+account_type
        // "Access-Control-Allow-Origin" : 'http://localhost:4200/'
      },
      
    })
    return next.handle(jwttoken).pipe(
      catchError((requestError) => {
        if (requestError.status == 401) {
          let url: string = this.route.url;
          if (!url.startsWith("/login")) {
            this.route.navigate(["/login"]).then(()=>{
              window.location.reload();
              this.toster.warning("Session May Be Ended Please Login Again !", );
             });
          }
        }else {
          console.log(requestError)
          if(requestError.error!=null){
            if(requestError.error.message!=null){
              this.toster.error(requestError.error.message);
            }else if(typeof requestError.error === 'string'){
               let obj:Error= JSON.parse(requestError.error);
               this.toster.error(obj.message);
            }
            
          }else{
            this.toster.error(requestError.message);
          }
          
        }
        return throwError(requestError);
      })
    );
  }
}
