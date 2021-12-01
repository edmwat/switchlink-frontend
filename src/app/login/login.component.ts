import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from '../models/account';
import { FundsTransfer } from '../models/fundsTransfer';
import { LoginDto } from '../models/login';
import { AuthService } from '../services/auth.service';
import { CashService } from '../services/cash.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _formBuilder:FormBuilder,private auth:AuthService) { }
  formGroup!: FormGroup;
  validationError:string = "";
  OAUTH2_REDIRECT_URI:string = 'http://localhost:4200/user';
  baseUrl:string="http://localhost:8080/getAuth";
 
  ngOnInit(): void {
   //this.auth.login();
    
    this.formGroup = this._formBuilder.group({
      username: ['', Validators.email],
      password: ['',Validators.required],
    });
  }
  

  login():void{
    //window.open("http://localhost:8080/oauth2/authorization/google",'_self');
     var login = new LoginDto();
    
    login.username = this.formGroup.controls['username'].value
    login.password = this.formGroup.controls['password'].value
   
    if(login.username !="" && login.password ){
      this.validationError ="";
     
      this.auth.authenticate(login);
      this.formGroup.reset();
    }else{
      this.validationError ="Kindly complete the form!";
    } 
    
  }


}
