import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  
  constructor(public authService:AuthService,
    private router: Router,
    private _snackBar: MatSnackBar,) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const modreq = request.clone({
      setHeaders:{      
        Authorization:`Bearer ${window.localStorage.getItem("access_token")}`
      }
    }); 
    return next.handle(modreq).pipe(
      tap((event:HttpEvent<any>)=>{
        if(event instanceof HttpResponse){
          console.log("At Interceptor "+event.headers.get("access_token"))
          console.log("The body of every request: "+event.body)

        }
      },(err:any)=>{
        if(err instanceof HttpErrorResponse){
          if(err.status == 401){
            console.log("should login");
          }else{
            console.log("Whatever other error: "+err.status);
          }
        }
      }
      )) 

        /* catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
            console.log('this is client side error');
            errorMsg = `Error: ${error.error.message}`;
          }
          else { 
            console.log('this is server side error');
            if(error.status == 401){
              console.log("login")
              this.router.navigate(['/login']);
            }else if(error.status == 403){
              console.log("access token")
              console.log(window.localStorage.getItem("access_token"));
            }
            else if(error.status == 200){
              console.log(error.message)
              this.openSnackBar();
            }else{
              console.log("else interceptor")
              errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
            }           
          }
          return throwError(errorMsg);
        })
      ) */
  }
  openSnackBar() {
    this._snackBar.open('Operation Successful', 'close', {
      duration: 5000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}