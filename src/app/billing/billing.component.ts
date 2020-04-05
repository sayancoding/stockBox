import { Component, OnInit } from "@angular/core";
import { Product } from "../model/entryProduct.model";
import { EntryProductService } from "../service/entry-product.service";
import { CartProduct } from "../model/carProduct.model";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Bills } from '../model/billsDetails.model';

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

  showSpinner: boolean = false;
  showCart = false;

  //Bills Variable
  receiptNo: string;
  bill: Bills;

  storeData() {
    this._products.getProducts().subscribe((prod) => {
      this.products = prod;
      this.copyProduct = prod;
      setTimeout(() => {
        this.showSpinner = false;
      }, 200);
    });
  }

  constructor(private _products: EntryProductService) {
    this.storeData();
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
    customerContact: new FormControl(null,[Validators.required]),
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
    console.log(this.bill);
    this.billing.reset();
  }

  doCalc($event) {
    if (this.totalCartedAmount >= this.payable) {
      this.due = this.totalCartedAmount - this.payable;
    } else {
      this.due = 0;
    }
  }
}
