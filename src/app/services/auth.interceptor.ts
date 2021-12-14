import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  
  constructor(private authService:AuthService,
    private router: Router,
    private _snackBar: MatSnackBar) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = window.localStorage.getItem("access_token");
    if(token == null){
      return next.handle(request);
    }

    const req = request.clone({
      setHeaders:{      
        Authorization:`Bearer ${window.localStorage.getItem("access_token")}`
      }
    }); 

    //let modreq = 
    return next.handle(req).pipe(
     /*  tap((event:HttpEvent<any>)=>{
        if(event instanceof HttpResponse){         
          console.log("Body: "+event.body)        
        }       
      },(err:any)=>{
        if(err instanceof HttpErrorResponse){
          if(err.status == 401){
            console.log("should login");
          }else if(err.status == 403){
            console.log("Error 403: "+err.url)
          }
          else{         
            this.openSnackBar(err.error.text);
          }
        }
      }
      ))  */

        catchError((error: HttpErrorResponse) => {
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
              window.localStorage.removeItem("access_token"); 
              let rt = window.localStorage.getItem("refresh_token");
              let refreshTkn = rt !== null ? rt : "";

              window.localStorage.setItem("access_token",refreshTkn); 
                            
              this.authService.getRefreshToken();

              //console.log(window.localStorage.getItem("access_token"));
            }
            else if(error.status == 200){
              console.log(error.message)
              this.openSnackBar(error.error.text);
            }else{
              console.log("else interceptor")
              errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
            }           
          }
          return throwError(errorMsg);
        })
      )
  }
  openSnackBar(message:string) {
    this._snackBar.open(message, 'close', {
      duration: 5000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}