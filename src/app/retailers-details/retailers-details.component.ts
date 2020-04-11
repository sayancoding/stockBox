import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Retailer } from '../model/retailer.model';
import { RetailersService } from '../service/retailers.service';

@Component({
  selector: "app-retailers-details",
  templateUrl: "./retailers-details.component.html",
  styleUrls: ["./retailers-details.component.css"],
})
export class RetailersDetailsComponent implements OnInit {
  currRetailer: Retailer = {};
  showSpinner = false;
  constructor(public retailerService: RetailersService) {}

  ngOnInit() {}

  entryRetailers = new FormGroup({
    retailerName: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[a-zA-Z]+$/),
    ]),
    retailerAddress: new FormControl(null, [Validators.required]),
    gstOrPanNumber: new FormControl(null, []),
    retailerContact: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[0-9]\d*$/),
      Validators.minLength(10),
    ]),
  });
  onSubmit() {
    this.showSpinner = true;
    this.currRetailer = {
      retailerName: this.entryRetailers.get("retailerName").value,
      retailerAddress: this.entryRetailers.get("retailerAddress").value,
      retailerContact: this.entryRetailers.get("retailerContact").value,
      gstOrPanNumber: this.entryRetailers.get("gstOrPanNumber").value,
    };
    this.retailerService.addRetailer(this.currRetailer);
    setTimeout(() => {
      this.showSpinner = false;
    }, 300);
    console.log(this.currRetailer);
    alert(`Retailer Details added..`);
    this.entryRetailers.reset();
  }
}
