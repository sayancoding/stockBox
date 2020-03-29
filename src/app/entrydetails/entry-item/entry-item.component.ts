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
  gst: any = this.price + 1;

  constructor() {}

  ngOnInit() {}

  entryProductDetails = new FormGroup({
    productName: new FormControl(null, [Validators.required]),
    productCategory: new FormControl(null, [Validators.required]),
    productCompany: new FormControl(null, [Validators.required]),
    productQuantity: new FormControl(null, [Validators.required]),
    productPrice: new FormControl(null, [Validators.required]),
    productGST: new FormControl(null, [Validators.required]),
    productTotalPrice: new FormControl(this.gst)
  });

  onSubmit() {
    this.product = this.entryProductDetails.value;
    console.log(this.entryProductDetails.value, this.product);
  }

  getPrice(){
    this.gst = this.entryProductDetails.get("productPrice");
    console.log(this.gst)
  }
}
