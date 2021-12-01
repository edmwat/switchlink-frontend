import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  constructor(private http:HttpClient) { }
 
  authenticate(cred:LoginDto){  
   /*  const headers = new HttpHeaders(credentials ? {
      authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)
    } : {}); */

    const myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    let credBody = new URLSearchParams();
      credBody.set('username', cred.username);
      credBody.set('password', cred.password);

  this.http.post(this.baseUrl+"/auth/login", credBody.toString(),{headers:myheader})
  .pipe(
    tap(res=> {
      if (res instanceof HttpResponse) {
        console.log("After login")
        window.localStorage.removeItem("access_token");  
        window.localStorage.setItem("access_token", res.body.access_token);                                
      }
      }),
  )
    .subscribe((data) => {
      console.log(data)
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
   /*  this.http.get<any>(this.baseUrl).subscribe(res=>{
      console.log("loggedIn");
    },
    err=>{
      console.log("ERRORERROR:::::::::"+err.message);
    }); */
  }
 
}
