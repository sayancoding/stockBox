import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DebitDetails } from 'src/app/model/debitDetails.model';

@Component({
  selector: "app-new-customer",
  templateUrl: "./new-customer.component.html",
  styleUrls: ["./new-customer.component.css"],
})
export class NewCustomerComponent implements OnInit {
  currCustomer: DebitDetails;
  today: string = new Date().toDateString();

  t: number = 0;
  c: number = 0;
  d: number = 0;

  constructor() {}

  ngOnInit() {}
  newCredit = new FormGroup({
    date: new FormControl(),
    customerName: new FormControl(null, [Validators.required]),
    customerAddress: new FormControl(null, [Validators.required]),
    customerContact: new FormControl(null, [Validators.required]),
    totalAmount: new FormControl(),
    debitAmount: new FormControl(),
    creditAmount: new FormControl(),
  });

  onSubmit() {
    this.currCustomer = {
      date: new Date().toDateString(),
      // date: this.newCredit.get("date").value,
      customerName: this.newCredit.get("customerName").value,
      customerAddress: this.newCredit.get("customerAddress").value,
      customerContact: this.newCredit.get("customerContact").value,
      totalAmount: parseInt(this.newCredit.get("totalAmount").value),
      debitAmount: parseInt(this.newCredit.get("debitAmount").value),
      creditAmount: parseInt(this.newCredit.get("creditAmount").value),
      history: [
        {
          totalAmount: parseInt(this.newCredit.get("totalAmount").value),
          debitAmount: parseInt(this.newCredit.get("debitAmount").value),
          creditAmount: parseInt(this.newCredit.get("creditAmount").value),
        },
      ],
    };
    console.log(this.currCustomer);
  }

  doCalc() {
    if (this.t >= this.d) {
      this.c = this.t - this.d;
    } else {
      alert(`Amount must be balanced !`);
      this.d = 0;
    }
    console.log(this.c);
  }
}
