import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from '../models/account';

@Component({
  selector: 'app-query-balance',
  templateUrl: './query-balance.component.html',
  styleUrls: ['./query-balance.component.css']
})
export class QueryBalanceComponent implements OnInit {

  constructor(private _formBuilder:FormBuilder) { }
  formGroup!: FormGroup;
  validationError:string = "";
  account:String ="";
  selectedAccount:string="";
  
  ngOnInit(): void {
    this.formGroup = this._formBuilder.group({
      sourceAcc: ['', Validators.required],
    });
  }
  accounts:Account[] = [
    {value:'Edward', viewValue:"12345"}
  ]
  balanceEnquiry():void{
    //var atmWthdrawal = new AtmWithdrawal();
    
     this.account = this.formGroup.controls['sourceAcc'].value
     console.log(this.account);
    if(this.account !=""  ){
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
