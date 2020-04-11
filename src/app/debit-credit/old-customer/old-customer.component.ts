import { Component, OnInit } from '@angular/core';
import { DebitDetails } from 'src/app/model/debitDetails.model';
import { DebitCreditService } from 'src/app/service/debit-credit.service';

@Component({
  selector: "app-old-customer",
  templateUrl: "./old-customer.component.html",
  styleUrls: ["./old-customer.component.css"],
})
export class OldCustomerComponent implements OnInit {
  updatingCredit: DebitDetails = null;
  term: string;
  updateStatus: boolean = false;
  showSpinner: boolean = true;

  //update section variable
  curDate: string = new Date().toDateString();
  previousCredit: number = 0;
  totalCredit: number = 0;
  newCredit: number = 0;
  debit: number = 0;
  credit: number = 0;

  debitsCredits: DebitDetails[] = null;

  constructor(public dcService: DebitCreditService) {
    this.dcService.getRecords().subscribe((dc) => {
      this.debitsCredits = dc;
      setTimeout(() => {
        this.showSpinner = false;
      }, 200);
    });
  }

  ngOnInit() {}

  clearStatus() {
    this.updateStatus = false;
    this.updatingCredit = {};
    this.newCredit = 0;
    this.debit = 0;
  }
  toUpdateCredit($event, item: DebitDetails) {
    this.updateStatus = true;
    console.log(item);
    this.updatingCredit = item;

    this.previousCredit = item.creditAmount;
    this.totalCredit = item.creditAmount;
    this.credit = item.creditAmount;
  }
  doCalculate($event) {
    this.totalCredit =
      parseInt(this.updatingCredit.creditAmount.toString()) +
      parseInt(this.newCredit.toString());
    // if(this.totalCredit>=this.debit)
    // {
    this.credit = this.totalCredit - parseInt(this.debit.toString());
    // }else{
    //   alert(`Amount must be balanced..`)
    // }
  }
  onSubmit($event) {
    this.updatingCredit.date = this.curDate;
    this.updatingCredit.totalAmount = parseInt(this.totalCredit.toString());
    this.updatingCredit.debitAmount = parseInt(this.debit.toString());
    this.updatingCredit.creditAmount = parseInt(this.credit.toString());
    if(this.updatingCredit.totalAmount>this.previousCredit || this.updatingCredit.debitAmount>0)
    {
      this.updatingCredit.history.push({
        date: new Date().toDateString(),
        totalAmount: parseInt(this.totalCredit.toString()),
        debitAmount: parseInt(this.debit.toString()),
        creditAmount: parseInt(this.credit.toString()),
      });
      this.dcService.updateRecord(this.updatingCredit);
      alert(`Recorded Updated..`);
    }
    console.log(this.updatingCredit)
    this.updatingCredit = {};
    this.newCredit = 0;
    this.debit = 0;
    this.clearStatus();
  }
}
