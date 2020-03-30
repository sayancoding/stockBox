import { Component, OnInit } from '@angular/core';
import { EntryProductService } from 'src/app/service/entry-product.service';
import { Product } from 'src/app/model/entryProduct.model';

@Component({
  selector: "app-view-products",
  templateUrl: "./view-products.component.html",
  styleUrls: ["./view-products.component.css"]
})
export class ViewProductsComponent implements OnInit {
  products: Product[];
  public productToUpdate: Product;

  name:string;

  updateStatus: boolean = false;

  public price: any;
  public gst: any;
  public quantity: any;

  public total: any;
  public gstPrice: any;

  constructor(private _products: EntryProductService) {
    this._products.getProducts().subscribe(prod => {
      this.products = prod;
    });
  }

  ngOnInit() {}

  deleteItem($event, product: Product) {
    this._products.deleteProduct(product);
  }
  toUpdateProduct($event, product: Product) {
    
    this.updateStatus = true;
  }
  clearStatus() {
    this.updateStatus = false;
    return this.updateStatus;
  }
  onSubmit(product:Product) {

  }

  getTotalPrice() {

  }
}
