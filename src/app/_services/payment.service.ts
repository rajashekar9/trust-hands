import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../models/account';

const API_URL = 'http://localhost:8080/api/test/';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private accounts: Account[] = [
    {
      accountNumber: '123456789',
      accountType: 'savings',
      balance: '878',
      permission: 'ADMIN',
      admin: true
    },
    {
      accountNumber: '123456788',
      accountType: 'savings',
      balance: '878',
      permission: 'VIEW_ACCOUNT',
      payment_limit: '23',
      admin: false
    },
    {
      accountNumber: '123456787',
      accountType: 'savings',
      balance: '878',
      permission: 'MAKE_PAYMENT',
      payment_limit: '123',
      admin: false
    },
    {
      accountNumber: '123456786',
      accountType: 'savings',
      balance: '878',
      permission: 'VIEW_ACCOUNT',
      payment_limit: '123',
      admin: false
    },
    {
      accountNumber: '123456785',
      accountType: 'savings',
      balance: '878',
      permission: 'PAY_BILL',
      payment_limit: '123',
      admin: false
    }
  ]

  constructor(private http: HttpClient) { 
    
  }

  getAccounts(): Observable<any> {
    return this.http.get(API_URL + 'account-details', { responseType: 'text' });
  }

  getBalances(): Observable<any> {
    return this.http.get(API_URL + 'balances', { responseType: 'text' });
  }

  postPayment(account:Account): Observable<any> {
    return this.http.post(API_URL + '/' + account.accountNumber, { responseType: 'text' });
  }

  getAllAccounts(): Account[] {
    return this.accounts;
  }

  getAccountByNumber(accountNumber: string): Account | undefined {
    return this.accounts.find(account => account.accountNumber === accountNumber);
  }

  processPayment(accountNumber: string, amount: number): string {
    const account = this.getAccountByNumber(accountNumber);

    if (!account) {
      return 'Account not found';
    }

    if (parseFloat(account.balance) < amount) {
      return 'Insufficient balance';
    }

    // if (amount > parseFloat(account.payment_limit)) {
    //   return 'Payment exceeds limit';
    // }

    // Update balance
    account.balance = (parseFloat(account.balance) - amount).toString();
    return 'Payment successful';
  }


}
