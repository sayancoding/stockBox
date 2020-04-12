import { Component, OnInit } from '@angular/core';
import { DebitDetails } from 'src/app/model/debitDetails.model';
import { DebitCreditService } from 'src/app/service/debit-credit.service';

import * as jsPDF from "jspdf";
import "jspdf-autotable";
import { UserOptions } from "jspdf-autotable";

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

  //history view
  historyView: any[] = [];
  history_2d: any[] = [];
  cache: any[] = [];
  viewItemDetails: DebitDetails = {};

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
    this.credit = this.totalCredit - parseInt(this.debit.toString());
  }
  onSubmit($event) {
    this.updatingCredit.date = this.curDate;
    this.updatingCredit.totalAmount = parseInt(this.totalCredit.toString());
    this.updatingCredit.debitAmount = parseInt(this.debit.toString());
    this.updatingCredit.creditAmount = parseInt(this.credit.toString());
    if (
      this.updatingCredit.totalAmount > this.previousCredit ||
      this.updatingCredit.debitAmount > 0
    ) {
      this.updatingCredit.history.push({
        date: new Date().toDateString(),
        totalAmount: parseInt(this.totalCredit.toString()),
        debitAmount: parseInt(this.debit.toString()),
        creditAmount: parseInt(this.credit.toString()),
      });
      this.dcService.updateRecord(this.updatingCredit);
      alert(`Recorded Updated..`);
    }
    // console.log(this.updatingCredit);
    this.updatingCredit = {};
    this.newCredit = 0;
    this.debit = 0;
    this.clearStatus();
  }

  viewItem($event, item: DebitDetails) {
    this.viewItemDetails = item;
    this.historyView = item.history;
    for (let i = 0; i < this.historyView.length; i++) {
      this.cache.push(`${this.historyView[i].date}`);
      this.cache.push(`${this.historyView[i].totalAmount}`);
      this.cache.push(`${this.historyView[i].debitAmount}`);
      this.cache.push(`${this.historyView[i].creditAmount}`);

      this.history_2d.push(this.cache);
      this.cache = [];
    }
    // console.log(this.history_2d)
    this.historyViewPdf(this.history_2d);
    this.history_2d = [];
    this.cache = [];
  }

  historyViewPdf(data) {
    const doc = new jsPDF();

    doc.setFontSize(10);
    doc.setFontStyle("bold");
    doc.text(`Customer : ${this.viewItemDetails.customerName}`, 14, 20);
    doc.autoTable({
      margin: { top: 22 },
      theme: "grid",
      head: [["Date", "Total Credit", "Debit", "Current Credit"]],
      body: data,
    });
    doc.setProperties({
      title: `${this.viewItemDetails.customerName}_CD_track.pdf`,
    });
    var string = doc.output("datauristring");
    var iframe =
      "<iframe width='100%' height='100%' src='" + string + "'></iframe>";
    var x = window.open();
    x.document.open();
    x.document.write(iframe);
    x.document.close();
  }

  removeItem($event, item){
    this.dcService.removeRecord(item);
  }
}
