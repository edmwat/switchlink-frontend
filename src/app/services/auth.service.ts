import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, first, map, tap } from 'rxjs/operators';
import { AuthenticatedUser } from '../models/authenticatedUser';
import { LoginDto } from '../models/login';
import { NewUser } from '../models/newUser';
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
     const myTokens:Tokens = data as Tokens;

        window.localStorage.removeItem("access_token");  
        window.localStorage.removeItem("refresh_token");
        window.localStorage.setItem("access_token",myTokens.access_token); 
        window.localStorage.setItem("refresh_token", myTokens.refresh_token); 
        this.router.navigate(['/user']);
      
    },error=>{
      console.log("Error from server: "+error.message)
    });
  }
  getRefreshToken(){
    this.http.get(this.baseUrl+"/token/refresh".toString(),{headers:this.headers}).subscribe((data) => {  
      let myTokens:Tokens = data as Tokens;
        if(myTokens.access_token == undefined){
          window.localStorage.removeItem("access_token");  
          window.localStorage.removeItem("refresh_token");
          this.router.navigate(['/login']);
        }else{
          window.localStorage.removeItem("access_token");  
         window.localStorage.removeItem("refresh_token");
         window.localStorage.setItem("access_token",myTokens.access_token); 
         window.localStorage.setItem("refresh_token", myTokens.refresh_token); 
         this.router.navigate(['/user']);
        }
         
       
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
  addNewUser(newUser:NewUser){
    const myheader = new HttpHeaders().set('Content-Type', 'application/json')
    this.http.post(this.baseUrl+"/api/add",newUser,{headers:myheader}).subscribe(res=>{
      console.log("User ADDED "+res);
    }, err=>{
      console.log("error occured "+err.message);
    })
  }
  getAuthenticatedUser():Observable<AuthenticatedUser>{
    const myheader = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http.get<AuthenticatedUser>(this.baseUrl+"/getAuth",{headers:myheader});
  }
  logout(){
    const myheader = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http.get(this.baseUrl+"/auth/login?logout",{headers:myheader}).subscribe(res=>{
      console.log("After logout::"+res)
    },error=>{
      console.log("Error logging out!"+error.message);
    })
  }
}
