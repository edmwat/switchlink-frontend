import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CashService } from '../services/cash.service';
import { AuthService } from '../services/auth.service';
import { AuthenticatedUser } from '../models/authenticatedUser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  authUser:string="";

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
     private authService:AuthService,
     private router:Router) {
    this.authService.getAuthenticatedUser().subscribe(response=>{
      this.authUser = response.username;
      console.log("dashboard:"+response.username)
    });
  }

  ngOnInit(){
    if(this.authUser == null){
      this.logout();
    }
  }
  logout(){
    window.localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }
  removeToken(){
    

  }

}
