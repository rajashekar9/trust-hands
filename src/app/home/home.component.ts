import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Account } from '../models/account';
import { Router } from '@angular/router';
import { PaymentService } from '../_services/payment.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content?: string;
  actionType: string = '';
  childMessage: string = '';

  accounts: any = []

  constructor(private userService: UserService, private router: Router, private paymentService:PaymentService) { }

  ngOnInit(): void {
    this.userService.getPublicContent().subscribe({
      next: data => {
        this.content = data;
        
      },
      error: err => {
        if (err.error) {
          try {
            const res = JSON.parse(err.error);
            this.content = res.message;
          } catch {
            this.content = `Error with status: ${err.status} - ${err.statusText}`;
          }
        } else {
          this.content = `Error with status: ${err.status}`;
        }
      }
    });

    this.accounts= this.paymentService.getAllAccounts()
  }

  makePayment(account: Account): void {
    this.actionType = 'makeTransaction';
    this.router.navigate(['/payments'])
  }

  payBill(account: Account): void {
    this.actionType = 'payBill';
    this.router.navigate(['/payments'])
  }

  onSettings() {
    this.router.navigate(['/settings']);
  }

  onChildMessage(message: any): void {
    this.childMessage = message;
  }

}
