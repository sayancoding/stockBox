import { Component, OnInit } from "@angular/core";
import { Product } from "../model/entryProduct.model";
import { EntryProductService } from "../service/entry-product.service";
import { CartProduct } from "../model/carProduct.model";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Bills } from "../model/billsDetails.model";
import { BillingService } from "../service/billing.service";

import { EventEmitter } from "events";
import { Router } from '@angular/router';
import { InvoiceService } from '../service/invoice.service';

import {imgData} from  './imageData';

import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable'


@Component({
  selector: "app-billing",
  templateUrl: "./billing.component.html",
  styleUrls: ["./billing.component.css"],
})
export class BillingComponent implements OnInit {
  products: Product[];
  copyProduct: Product[];

  singleProduct: Product;

  cartProduct: CartProduct;
  count: number;
  totalCarted: number = 0;
  totalCartedAmount = 0;
  payable = 0;
  due = this.totalCartedAmount;

  carted: CartProduct[] = [];
  cart_2d:any[]=[];
  cart_1d:any[]=[];

  showSpinner: boolean = true;
  showCart = false;

  //Bills Variable
  receiptNo: string;
  bill: Bills;
  storedBills: Bills[];

  storeData() {
    this._products.getProducts().subscribe((prod) => {
      this.products = prod;
      this.copyProduct = prod;
      setTimeout(() => {
        this.showSpinner = false;
      }, 200);
    });
  }

  storedAllBill() {
    this.showSpinner = true;
    this._bills.getBills().subscribe((bills) => {
      this.storedBills = bills;
      this.showSpinner = false;
      console.log(this.storedBills);
    });
  }

  constructor(
    private _products: EntryProductService,
    private _bills: BillingService,
    public _emitter: EventEmitter,
    public _router: Router,
    private _invoiceService: InvoiceService
  ) {
    this.storeData();
    this.storedAllBill();
  }

  ngOnInit() {}
  addProduct($event, pr) {
    this.copyProduct = pr;
    this.cartProduct = {
      id: pr.id,
      productName: pr.productName,
      productTotalGSTPrice: pr.productTotalGSTPrice,
      productCount: 1,
      priceSum: pr.productTotalGSTPrice,
    };
    if (this.carted.length === 0) {
      if (pr.productQuantity >= this.cartProduct.productCount) {
        this.carted.push(this.cartProduct);
        this.totalCartedAmount += this.cartProduct.productTotalGSTPrice;
        ++this.totalCarted;
        this.doCalc($event);
      } else alert(`Quantity limited`);
    } else {
      var isSame = false;
      for (var i = 0; i < this.carted.length; i++) {
        isSame = false;
        if (this.cartProduct.id === this.carted[i].id) {
          isSame = true;
          break;
        }
      }
      if (isSame) {
        if (pr.productQuantity > this.carted[i].productCount) {
          this.carted[i].productCount += 1;
          this.carted[i].priceSum += this.carted[i].productTotalGSTPrice;
          this.totalCartedAmount += this.cartProduct.productTotalGSTPrice;
          this.doCalc($event);
          ++this.totalCarted;
        } else alert(`Quantity limited`);
      } else {
        if (pr.productQuantity >= this.cartProduct.productCount) {
          this.carted.push(this.cartProduct);
          this.totalCartedAmount += this.cartProduct.productTotalGSTPrice;
          this.doCalc($event);
          ++this.totalCarted;
        } else {
          alert(`Quantity limited`);
        }
      }
    }
    console.log(this.carted);
    console.log(`Total carted : ${this.totalCarted}`);
  }
  removeProduct($event, pr) {
    this.cartProduct = {
      id: pr.id,
      productName: pr.productName,
      productTotalGSTPrice: pr.productTotalGSTPrice,
      productCount: 1,
      priceSum: pr.productTotalGSTPrice,
    };
    if (this.carted.length === 0) {
      alert(`Cart is empty now 🤐`);
    } else {
      var isSame = false;
      for (var i = 0; i < this.carted.length; i++) {
        isSame = false;
        if (this.cartProduct.id === this.carted[i].id) {
          isSame = true;
          break;
        }
      }
      if (isSame) {
        if (this.carted[i].productCount > 0) {
          this.carted[i].productCount -= 1;
          --this.totalCarted;
          this.carted[i].priceSum -= this.carted[i].productTotalGSTPrice;
          this.totalCartedAmount -= this.cartProduct.productTotalGSTPrice;
          this.doCalc($event);
        } else if (this.totalCarted === 0) {
          alert(`Cart is empty now 🤐`);
        } else if (this.carted[i].productCount === 0) {
          alert(`Quantity limited! `);
        }
      } else {
        alert(`Hasn't in Cart 🤦‍♂️`);
      }
    }
    console.log(this.carted);
    console.log(`Total carted : ${this.totalCarted}`);
  }
  doProceed($event) {
    if (this.totalCarted > 0) {
      this.showSpinner = true;
      for (var i = 0; i < this.carted.length; i++) {
        for (var j = 0; j < this.products.length; j++) {
          if (this.carted[i].id === this.products[j].id) {
            this.singleProduct = this.products[j];
            this.singleProduct.productQuantity =
              parseInt(this.singleProduct.productQuantity.toFixed()) -
              this.carted[i].productCount;
            this._products.updateProduct(this.singleProduct);
            console.log(this.singleProduct);
          }
        }
      }
    }

    setTimeout(() => {
      this.showSpinner = false;
    }, 200);
    console.log(this.carted, this.products);
    this.carted = [];
    this.totalCarted = 0;
    console.log(this.carted);
    // this.storeData()
    // this._products.doProceedDB(this.carted);
  }

  viewCart($event) {
    this.showCart = !this.showCart;
  }

  //on - bills Method
  billing = new FormGroup({
    customerName: new FormControl(null, [Validators.required]),
    customerAddress: new FormControl(null, [Validators.required]),
    customerContact: new FormControl(null, [Validators.required]),
    totalAmount: new FormControl(null),
    payableAmount: new FormControl(null),
    dueAmount: new FormControl(null),
  });

  doBill() {
    this.receiptNo = `VEW${new Date().getDay()}${
      new Date().getMonth() + 1
    }${new Date().getFullYear()}/${new Date().getHours()}${new Date().getMinutes()}/${new Date().getMilliseconds()}`;

    this.bill = {
      receiptNo: this.receiptNo,
      date: new Date().toDateString(),
      customerName: this.billing.get("customerName").value,
      customerAddress: this.billing.get("customerAddress").value,
      customerContact: this.billing.get("customerContact").value,
      cartedItems: this.carted,
      totalAmount: parseFloat(this.billing.get("totalAmount").value),
      payableAmount: parseFloat(this.billing.get("payableAmount").value),
      dueAmount: parseFloat(this.billing.get("dueAmount").value),
    };
    // this._bills.addBill(this.bill);
    this.billing.reset();
    this._emitter.emit("currentBillData", this.bill);
    alert(`Hurry! Thanks a lots🤝`);
    this.printPdf();
  }
  
  printPdf(){
    console.log(this.bill);
    console.log(this.carted);
    for(let i =0;i<this.carted.length;i++)
    {
      this.cart_1d.push(this.carted[i].productName);
      this.cart_1d.push(this.carted[i].productTotalGSTPrice);
      this.cart_1d.push(this.carted[i].productCount);
      this.cart_1d.push(this.carted[i].priceSum);

      this.cart_2d.push(this.cart_1d)
      this.cart_1d = [];
    }
    console.log(this.cart_2d)
    const doc = new jsPDF();
      doc.addImage(imgData, "JPEG", 14, 10, 20, 20);

      doc.setFontSize(14);
      doc.setFontStyle("bold");
      doc.setTextColor(255, 97, 97);
      doc.text("INVOICE", 138, 14);

      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0, 0, 0);
      doc.text(`Date: ${this.bill.date}`, 138, 19);
      doc.text(`Invoice No: ${this.bill.receiptNo}`, 138, 23);

      doc.setFontSize(14);
      doc.setFontStyle("bold");
      doc.text("VENUS ENGINEERING WORK", 36, 14.2);
      doc.setFontSize(10);
      doc.setFontStyle("normal");
      doc.text("Ghatal, Paschim Medinipur, Pin No - 721212 ", 36, 20);
      doc.setFontSize(9);
      doc.setFontStyle("bold");
      doc.text("Contact No: 9474086909", 36, 25);
      doc.text("GST No: XXXXXXXXX", 36, 29);

      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.text(`Buyer's Name: ${this.bill.customerName}`,20,46);
      doc.text(`Address: ${this.bill.customerAddress}`,20,51);
      doc.text(`Mobile No: ${this.bill.customerContact}`,20,56);

      doc.setFontSize(12);
      doc.text(`Total Amount: ${this.bill.totalAmount}`, 138, 256);
      doc.setFontSize(10);
      doc.text(`Payable Amount: ${this.bill.payableAmount}`, 138, 262);
      doc.text(`Due Amount: ${this.bill.dueAmount}`, 138, 266);

      doc.text("Owner(VEW) Authentication...", 16, 266);

      doc.setLineWidth(0.1);
      doc.line(16, 40, 190, 40, 60);

    doc.autoTable({
      margin: { top: 62 },
      theme:'grid',
      head: [["Item Name", "Price inc. GST", "Quantity", "Total Price"]],
      body: this.cart_2d,
    });
   doc.save(`${this.bill.receiptNo}`); 
  //  doc.output("datauristring");
   doc.setProperties({
     title: `${this.bill.receiptNo}.pdf`,
   });
    var string = doc.output('datauristring');
    var iframe = "<iframe width='100%' height='100%' src='" + string + "'></iframe>"
    var x = window.open();
    x.document.open();
    x.document.write(iframe);
    x.document.close();
  }
  doCalc($event) {
    if (this.totalCartedAmount >= this.payable) {
      this.due = this.totalCartedAmount - this.payable;
    } else {
      this.due = 0;
    }
  }
}
