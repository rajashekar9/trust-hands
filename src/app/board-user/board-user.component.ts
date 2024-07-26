import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { PaymentService } from '../_services/payment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  content?: string;
  accounts?: any;
  message?: string;
  paymentForm: FormGroup;
  form: any = {
    account: null,
    amount: null
  };

  constructor(private userService: UserService, private paymentService: PaymentService, private fb: FormBuilder) {
    this.paymentForm = this.fb.group({
      accountNumber: [this.form.accountNumber, Validators.required],
      balance: [this.form.balance, Validators.required],
    });
   }

  ngOnInit(): void {
    

    this.accounts = this.paymentService.getAllAccounts();

    
    this.userService.getUserBoard().subscribe({
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
  }

  makePayment(): void {
    const { accountNumber, amount } = this.form;
    debugger;
    this.message = this.paymentService.processPayment(accountNumber, amount);
  }

  


}
