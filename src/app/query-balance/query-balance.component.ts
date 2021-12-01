import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from '../models/account';
import { UserAccount } from '../models/userAccount';
import { CashService } from '../services/cash.service';

@Component({
  selector: 'app-query-balance',
  templateUrl: './query-balance.component.html',
  styleUrls: ['./query-balance.component.css']
})
export class QueryBalanceComponent implements OnInit {

  constructor(private _formBuilder:FormBuilder,
    private service:CashService) { }
  formGroup!: FormGroup;
  validationError:string = "";
  account:string ="";
  selectedAccount:string="";
  accountlist:UserAccount[]=[];
  userAccArr:Account[]=[];
  userAccBal:UserAccount=new UserAccount();
  
  ngOnInit(): void {
     this.service.getUserAccounts().subscribe(result=>{
      result.forEach(e=>{
        var acc = new Account();
        acc.value=e.accNumber;
        acc.viewValue=e.accNumber;
        this.userAccArr.push(acc);
        //console.log("ACCOUNTs "+ e.accNumber, e.accName,e.balance,e.username);
      })
      
      this.accountlist=result;
    },
    (error:HttpErrorResponse)=>{
      console.log("Error from backended::"+error.message)
    });

   this.formGroup = this._formBuilder.group({
      sourceAcc: ['', Validators.required],
    }); 
  }
  accounts:Account[] = [
    {value:'12345', viewValue:"12345"}
  ]
  balanceEnquiry():void{
    //var atmWthdrawal = new AtmWithdrawal();
    
     this.account = this.formGroup.controls['sourceAcc'].value
     console.log(this.account);
    if(this.account !=""  ){
      this.validationError ="";
      this.service.getAccountBal(this.account).subscribe(result=>{
        this.userAccBal = result;
        console.log("ACCOUNTs "+result);
        //this.accountlist=result;
      },
      error=>{
        console.log("Error from backended::"+error.message)
      });
      this.formGroup.reset();
    }else{
      this.validationError ="Kindly complete the form!";
    } 
  }
}