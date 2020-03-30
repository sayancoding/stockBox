import { Component, OnInit } from "@angular/core";
import { EntryProductService } from "src/app/service/entry-product.service";
import { Product } from "src/app/model/entryProduct.model";

@Component({
  selector: "app-view-products",
  templateUrl: "./view-products.component.html",
  styleUrls: ["./view-products.component.css"]
})
export class ViewProductsComponent implements OnInit {
  products: Product[];
  public productToUpdate: Product;

  name: string;

  updateStatus: boolean = false;
  showSpinner: boolean = true;

  public price: any;
  public gst: any;
  public quantity: any;

  public total: any;
  public gstPrice: any;

  constructor(private _products: EntryProductService) {
    this._products.getProducts().subscribe(prod => {
      this.products = prod;
      setTimeout(() => {
        this.showSpinner = false 
      }, 200);
    });
  }

  ngOnInit() {}

  deleteItem($event, product: Product) {
    this.clearStatus();
    this._products.deleteProduct(product);
  }
  toUpdateProduct($event, product: Product) {
    this.productToUpdate = product;
    this.updateStatus = true;
    console.log(this.productToUpdate);
  }
  clearStatus() {
    this.updateStatus = false;
    return this.updateStatus;
  }
  onSubmit(product: Product) {
    this.clearStatus();
    this.showSpinner = true;
    this._products.updateProduct(this.productToUpdate);
    setTimeout(() => {
      this.showSpinner = false;
      alert(`Product details updated 🔥`);
    }, 500);
    console.log(product);
  }

  doCalculate($event) {
    if (this.productToUpdate.productQuantity != undefined) {
      var qn = parseInt(this.productToUpdate.productQuantity.toString());
    }
    if (this.productToUpdate.productQuantity == undefined) {
      var qn = 0;
      this.productToUpdate.productQuantity = 0;
    }

    if (this.productToUpdate.productPrice != undefined) {
      var price = parseInt(this.productToUpdate.productPrice.toString());
    }
    if (this.productToUpdate.productPrice == undefined) {
      var price = 0;
      this.productToUpdate.productPrice = 0;
    }

    if (this.productToUpdate.productGST != undefined) {
      var gst = parseInt(this.productToUpdate.productGST.toString());
    }
    if (this.productToUpdate.productGST == undefined) {
      var gst = 0;
      this.productToUpdate.productGST = 0;
    }

    var gstPrice: number = price + (price * gst) / 100;
    var stockTotal: number = gstPrice * qn;

    gstPrice = parseInt(gstPrice.toFixed(2));
    stockTotal = parseInt(stockTotal.toFixed(2));

    this.productToUpdate.productTotalGSTPrice = gstPrice;
    this.productToUpdate.productTotalPrice = stockTotal;
    // console.log(stockTotal, gstPrice);
  }
}
