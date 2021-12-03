import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HTTP_OPTIONS } from '../config/httpHeader';
import { AtmWithdrawal } from '../models/atmWithdrawal';
import { FundsTransfer } from '../models/fundsTransfer';
import { LoginDto } from '../models/login';
import { TransactionResponse } from '../models/transactionResponse';
import { UserAccount } from '../models/userAccount';

@Injectable({
  providedIn: 'root'
})
export class CashService {
  
  baseUrl:string="http://localhost:8080";


  constructor(private http:HttpClient) {}

  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Content-Type':'application/json'
  });

  getAllAccounts():Observable<UserAccount[]>{
    return this.http.get<UserAccount[]>(this.baseUrl+"/api/all/accounts",{headers:this.headers});
  }
  getUserAccounts():Observable<UserAccount[]>{ 
    return this.http.get<UserAccount[]>(this.baseUrl+"/api/user/accounts",{headers:this.headers});
  }

	getAccountBal(acc:string):Observable<UserAccount> {	
    return this.http.get<UserAccount>(this.baseUrl+`/api/balance/${acc}`,{headers:this.headers});
	} 
	
	transferFunds(funds:FundsTransfer):Observable<any> {	
    return this.http.post<any>(this.baseUrl+"/api/transfer", funds, {headers:this.headers});
	}
	
	atmWithdrawal(atm:AtmWithdrawal):Observable<TransactionResponse> {		
		return this.http.post<TransactionResponse>(this.baseUrl+"/api/atmWithdraw", atm, {headers:this.headers});	
	} 
	updateAccount() {		
		
	}
}
