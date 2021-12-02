import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';
import { LoginDto } from '../models/login';
import { Tokens } from '../models/tokenfile';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authenticated:boolean=false;
  //baseUrl:string="http://localhost:8080";oauth2/authorization/google
  baseUrl:string="http://localhost:8080";

  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Content-Type':'application/json'
  });

  constructor(private http:HttpClient, private router:Router) { }
 
  authenticate(cred:LoginDto){  
   /*  const headers = new HttpHeaders(credentials ? {
      authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)
    } : {}); */

    const myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    let credBody = new URLSearchParams();
      credBody.set('username', cred.username);
      credBody.set('password', cred.password);

  this.http.post(this.baseUrl+"/auth/login", credBody.toString(),{headers:myheader})
  /* .pipe(
    tap(res=> {
      console.log("taptap")
      if (res instanceof HttpResponse) {
        console.log("After login tap")
                                      
      }
      }),
  ) */
    .subscribe((data) => {
       window.localStorage.removeItem("access_token");  
        window.localStorage.setItem("access_token", data.toString()); 
        this.router.navigate(['/user']);
      
    },error=>{
      console.log("Error from server: "+error.message)
    });
  }
  login(){
   /*  const headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', 'http://localhost:8080');
 */
    this.http.get(this.baseUrl).subscribe(res=>{
      console.log("login "+res);
    }, err=>{
      console.log("error occured "+err.message);
    })
  }
  isLoggedIn():Observable<boolean>{
    let isAuthenticated=false;
    if(window.localStorage.getItem('access_token'))
      isAuthenticated = true;
    return of(isAuthenticated);
  }
  addNewUser(){
    const myheader = new HttpHeaders().set('Content-Type', 'application/json')
    this.http.post(this.baseUrl+"/api/add",{},{headers:myheader}).subscribe(res=>{
      console.log("User ADDED "+res);
    }, err=>{
      console.log("error occured "+err.message);
    })
  }
}
