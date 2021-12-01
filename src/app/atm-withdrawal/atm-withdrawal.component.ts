import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from '../models/account';
import { AtmWithdrawal } from '../models/atmWithdrawal';
import { CashService } from '../services/cash.service';

@Component({
  selector: 'app-atm-withdrawal',
  templateUrl: './atm-withdrawal.component.html',
  styleUrls: ['./atm-withdrawal.component.css']
})
export class AtmWithdrawalComponent implements OnInit {

  userAccArr:Account[]=[];

  constructor(private _formBuilder:FormBuilder,private service:CashService) { }
  formGroup!: FormGroup;
  validationError:string = "";
  selectedAccount:string = "";
  
  ngOnInit(): void {
    this.service.getUserAccounts().subscribe(result=>{
      result.forEach(e=>{
        var acc = new Account();
        acc.value=e.accNumber;
        acc.viewValue=e.accNumber;
        this.userAccArr.push(acc);
        //console.log("ACCOUNTs "+ e.accNumber, e.accName,e.balance,e.username);
      })
    },
    (error:HttpErrorResponse)=>{
      console.log("Error from backended::"+error.message)
    });
    
    this.formGroup = this._formBuilder.group({
      sourceAcc: ['', Validators.required],
      amount: ['',Validators.required]
    });
  }
 
  atmWithdrawal():void{
    var atmWthdrawal = new AtmWithdrawal();
    
    atmWthdrawal.srcAcc = this.formGroup.controls['sourceAcc'].value
    atmWthdrawal.amount = this.formGroup.controls['amount'].value
   
    console.log(atmWthdrawal.srcAcc, atmWthdrawal.amount);
    if(atmWthdrawal.srcAcc !=""  && atmWthdrawal.amount !=0){
      this.validationError ="";
     
      this.service.atmWithdrawal(atmWthdrawal).subscribe(res=>{
        console.log("After funds transfer "+res);
      });

      this.formGroup.reset();
    }else{
      this.validationError ="Kindly complete the form!";
    } 
    
  }

}
