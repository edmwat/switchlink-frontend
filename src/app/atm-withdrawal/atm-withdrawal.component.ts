import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from '../models/account';
import { AtmWithdrawal } from '../models/atmWithdrawal';

@Component({
  selector: 'app-atm-withdrawal',
  templateUrl: './atm-withdrawal.component.html',
  styleUrls: ['./atm-withdrawal.component.css']
})
export class AtmWithdrawalComponent implements OnInit {

  constructor(private _formBuilder:FormBuilder) { }
  formGroup!: FormGroup;
  validationError:string = "";
  selectedAccount:string = "";
  
  ngOnInit(): void {
    this.formGroup = this._formBuilder.group({
      sourceAcc: ['', Validators.required],
      amount: ['',Validators.required]
    });
  }
  accounts:Account[] = [
    {value:'Edward', viewValue:"12345"}
  ]
  atmWithdrawal():void{
    var atmWthdrawal = new AtmWithdrawal();
    
    atmWthdrawal.sourceAcc = this.formGroup.controls['sourceAcc'].value
    atmWthdrawal.amount = this.formGroup.controls['amount'].value
   
    console.log(atmWthdrawal.sourceAcc, atmWthdrawal.amount);
    if(atmWthdrawal.sourceAcc !=""  && atmWthdrawal.amount !=0){
      this.validationError ="";
      /* this.gcloud.addContactingClient(enquiry).then(resp=>{
        this.openSnackBar();
      }).catch(e=>{
        console.log("Error:::"+e);
      }) */
      this.formGroup.reset();
    }else{
      this.validationError ="Kindly complete the form!";
    } 
    
  }

}
