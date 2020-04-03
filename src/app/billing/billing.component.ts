import { Component, OnInit } from '@angular/core';
import { Product } from '../model/entryProduct.model';
import { EntryProductService } from '../service/entry-product.service';
import { CartProduct } from '../model/carProduct.model';

@Component({
  selector: "app-billing",
  templateUrl: "./billing.component.html",
  styleUrls: ["./billing.component.css"]
})
export class BillingComponent implements OnInit {
  products: Product[];
  copyProduct: Product[];

  singleProduct:Product;

  cartProduct: CartProduct;
  count: number;
  totalCarted: number = 0;

  carted: CartProduct[] = [];

  showSpinner: boolean = true;

  constructor(private _products: EntryProductService) {
    this._products.getProducts().subscribe(prod => {
      this.products = prod;
      this.copyProduct = prod;
      setTimeout(() => {
        this.showSpinner = false;
      }, 200);
    });
  }

  ngOnInit() {}
  addProduct($event, pr) {
    this.copyProduct = pr;
    this.cartProduct = {
      id: pr.id,
      productName: pr.productName,
      productTotalGSTPrice: pr.productTotalGSTPrice,
      productCount: 1,
      priceSum:pr.productTotalGSTPrice
    };
    if (this.carted.length === 0) {
      if (pr.productQuantity >= this.cartProduct.productCount) {
        this.carted.push(this.cartProduct);
        
        ++this.totalCarted;
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
          ++this.totalCarted;
        } else alert(`Quantity limited`);
      } else {
        if (pr.productQuantity >= this.cartProduct.productCount) {
          this.carted.push(this.cartProduct);
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
      priceSum:pr.productTotalGSTPrice
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
  doProceed($event)
  {
    for(var i = 0;i<this.carted.length;i++)
    {
      for(var j = 0;j<this.products.length;j++)
      {
        if(this.carted[i].id === this.products[j].id)
        {
          this.singleProduct = this.products[j];
          this.singleProduct.productQuantity =
            parseInt(this.singleProduct.productQuantity.toFixed()) -
            this.carted[i].productCount;
          this._products.updateProduct(this.singleProduct);
          console.log(this.singleProduct)
        }
      }
    }
    console.log(this.carted,this.products)
    // this._products.doProceedDB(this.carted); 
  }
}
