import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'make-payment',
  templateUrl: './make-payment.component.html',
  styleUrl: './make-payment.component.css'
})
export class MakePaymentComponent {

  @Input("receivedAction")
  action!: string;
  @Output("sendMessage") message: EventEmitter<string> = new EventEmitter<string>();

  sendMessageToParent(): void {
    this.message.emit("Payment has been processed successfully!");
  }

  getTitle() {
    switch(this.action) {
      case 'payBill': return 'Pay Bill';
      case 'makeTransaction': return 'Make Transaction';
      default: return this.action;
    }
  }
}
