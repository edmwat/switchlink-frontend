import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from '../models/account';
import { FundsTransfer } from '../models/fundsTransfer';

@Component({
  selector: 'app-funds-transfer',
  templateUrl: './funds-transfer.component.html',
  styleUrls: ['./funds-transfer.component.css']
})
export class FundsTransferComponent implements OnInit {

  constructor(private _formBuilder:FormBuilder) { }
  formGroup!: FormGroup;
  validationError:string = "";
  selectedAccount:string ="";

  accounts:Account[] = [
    {value:'Edward', viewValue:"12345"}
  ]
  
  ngOnInit(): void {
    this.formGroup = this._formBuilder.group({
      sourceAcc: ['', Validators.required],
      destinationAcc: ['',Validators.required],
      amount: ['',Validators.required]
    });
  }
  

  fundsTransfer():void{
    var fundstrans = new FundsTransfer();
    
    fundstrans.sourceAcc = this.formGroup.controls['sourceAcc'].value
    fundstrans.destinationAcc = this.formGroup.controls['destinationAcc'].value
    fundstrans.amount = this.formGroup.controls['amount'].value

   console.log(fundstrans.sourceAcc,fundstrans.destinationAcc, fundstrans.amount);
   
    if(fundstrans.sourceAcc !="" && fundstrans.destinationAcc !="" && fundstrans.amount !=0){
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
