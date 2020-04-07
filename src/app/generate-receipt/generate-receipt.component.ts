import { Component, OnInit, SimpleChanges } from '@angular/core';
import { EventEmitter } from 'events';
import { Bills } from '../model/billsDetails.model';
import { ThrowStmt } from '@angular/compiler';
import { InvoiceService } from '../service/invoice.service';

@Component({
  selector: 'app-generate-receipt',
  templateUrl: './generate-receipt.component.html',
  styleUrls: ['./generate-receipt.component.css']
})
export class GenerateReceiptComponent implements OnInit {

  public bill:Bills;

  constructor(private _emitter:EventEmitter,private _invoiceService:InvoiceService) {
   }

  ngOnInit() {
        this._emitter.on("currentBillData", (data:Bills) => {
          this.bill = data;
          console.log(this.bill);
        });

      }
}
