import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Product } from "src/app/model/entryProduct.model";
import { Company } from 'src/app/model/enrtyCompany.model';
import { Category } from 'src/app/model/entryCategory.model';
import { EnrtyCompanyService } from 'src/app/service/enrty-company.service';
import { EntryCategoryService } from 'src/app/service/entry-category.service';
import { EntryProductService } from 'src/app/service/entry-product.service';

@Component({
  selector: "app-entry-item",
  templateUrl: "./entry-item.component.html",
  styleUrls: ["./entry-item.component.css"]
})
export class EntryItemComponent implements OnInit {
  companies: Company[];
  categories: Category[];
  products:Product[];

  product: Product;
  public price: any;
  public gst: any;
  public quantity: any;

  public total: number;
  public gstPrice: number;

  showSpinner:boolean = true;

  constructor(
    private _companyName: EnrtyCompanyService,
    private _categoryName: EntryCategoryService,
    private _productDetails: EntryProductService
  ) {
    this._companyName.getCompanyName().subscribe(cmp => {
      this.companies = cmp;
      this.showSpinner = false;
    });
    this._categoryName.getCategoriesName().subscribe(cat => {
      this.categories = cat;
      this.showSpinner = false;
    });

    this._productDetails.getProducts().subscribe(prod => {
      this.products = prod;
      console.log(this.products);
      this.showSpinner = false;
    }); 
  }

  ngOnInit() {}

  entryProductDetails = new FormGroup({
    productName: new FormControl(null, [Validators.required]),
    productCategory: new FormControl(null, [Validators.required]),
    productCompany: new FormControl(null, [Validators.required]),
    productDate : new FormControl(null,[Validators.required]),
    productQuantity: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[0-9]\d*$/)
    ]),
    productPrice: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[0-9]\d*$/)
    ]),
    productTotalGSTPrice: new FormControl(this.gstPrice),
    productGST: new FormControl(null, [
      Validators.required,
      ,
      Validators.pattern(/^[0-9]\d*$/)
    ]),
    productTotalPrice: new FormControl(this.total)
  });

  onSubmit() {
    this.showSpinner = true
    this.product = this.entryProductDetails.value;
    console.log(this.product);
    this._productDetails.addProduct(this.product);
      setTimeout(() => {
        alert(`your product added successfully 🤷‍♀️`);
        this.entryProductDetails.reset();
      }, 500); 
  }

  getTotalPrice() {
    let totalPer: number =
      parseInt(this.price) + (parseInt(this.price) * parseInt(this.gst)) / 100;
    this.gstPrice = totalPer;
    this.gstPrice = parseInt(this.gstPrice.toFixed());

    let total: number = totalPer * parseInt(this.quantity);
    this.total = total;
    this.total = parseInt(this.total.toFixed());
  }
}
