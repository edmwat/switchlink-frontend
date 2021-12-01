import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public authService:AuthService) {
    console.log("Interceptor constructore token")
    console.log(window.localStorage.getItem("access_token"));
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const modreq = request.clone({
      setHeaders:{      
        Authorization:`Bearer ${window.localStorage.getItem("access_token")}`
      }
    }); 
    return next.handle(modreq).pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
            console.log('this is client side error');
            errorMsg = `Error: ${error.error.message}`;
          }
          else { 
            console.log('this is server side error');
            if(error.status == 401){
              console.log("This is a 401")
              this.authService.login();
            }else
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
          }
          console.log(errorMsg);
          return throwError(errorMsg);
        })
      )
  }
}