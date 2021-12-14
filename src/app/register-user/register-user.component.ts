import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NewUser } from '../models/newUser';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  isSubmitted:boolean=false;
  formGroup:FormGroup;

  constructor(private dialogRef: MatDialogRef<RegisterUserComponent>,
              private formBuilder:FormBuilder,
              private authService:AuthService) { 
                this.formGroup = formBuilder.group({});
              }

  ngOnInit(): void {
    //"edmwat@gmail.com","1234",AppUserRole.USER,true,true,true,true
    this.formGroup = this.formBuilder.group({
      email:['',Validators.email],
      password:['',Validators.required]
    })  
  }
  get formControls(){   
    return this.formGroup['controls'];
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  registerNewUser():void{
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let newUser = new NewUser();
        newUser.email = result.email;
        newUser.password=result.password;
        this.authService.addNewUser(newUser); 
      } else {
        console.log("nothing...");
      }
    });
  }
  register(){
    console.log(this.formGroup.controls['username'].value);
  }

}
