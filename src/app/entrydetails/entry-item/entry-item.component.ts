import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from 'src/app/model/entryProduct.model';

@Component({
  selector: "app-entry-item",
  templateUrl: "./entry-item.component.html",
  styleUrls: ["./entry-item.component.css"]
})
export class EntryItemComponent implements OnInit {
  product: Product;
  public price: any;
  public gst: any;
  public quantity: any;

  public total: any;
  public gstPrice: any;

  constructor() {}

  ngOnInit() {}

  entryProductDetails = new FormGroup({
    productName: new FormControl(null, [Validators.required]),
    productCategory: new FormControl(null, [Validators.required]),
    productCompany: new FormControl(null, [Validators.required]),
    productQuantity: new FormControl(null, [Validators.required]),
    productPrice: new FormControl(null, [Validators.required]),
    productTotalGSTPrice: new FormControl(this.gstPrice),
    productGST: new FormControl(null, [Validators.required]),
    productTotalPrice: new FormControl(this.total)
  });

  onSubmit() {
    this.product = this.entryProductDetails.value;
    console.log(this.entryProductDetails.value, this.product);
  }

  getTotalPrice() {
    let totalPer: number =
      parseInt(this.price) + (parseInt(this.price) * parseInt(this.gst)) / 100;
    this.gstPrice = totalPer;
    this.gstPrice = parseFloat(this.gstPrice).toFixed(2);

    let total: number = totalPer * parseInt(this.quantity);
    this.total = total;
    this.total = parseFloat(this.total).toFixed(2);

    if (typeof this.price !== undefined && typeof this.gst !== undefined) {
      console.log(totalPer, parseFloat(this.total).toFixed(2));
    }
  }
}
