import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'
import { DashboardComponent } from './dashboard/dashboard.component';
import { PortalComponent } from './portal/portal.component';
import { QueryBalanceComponent } from './query-balance/query-balance.component';
import { FundsTransferComponent } from './funds-transfer/funds-transfer.component';
import { AtmWithdrawalComponent } from './atm-withdrawal/atm-withdrawal.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path: 'user', canActivate:[AuthGuard], children:[
    {path: '', component: QueryBalanceComponent},
    {path: 'funds-transfer', component:FundsTransferComponent},
    {path: 'ATM-Withdrawal', component: AtmWithdrawalComponent} 
  ], component: DashboardComponent},
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'}

  
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
