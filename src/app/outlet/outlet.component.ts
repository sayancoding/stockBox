import { Component, OnInit } from '@angular/core';
import { Retailer } from '../model/retailer.model';
import { RetailersService } from '../service/retailers.service';

@Component({
  selector: "app-outlet",
  templateUrl: "./outlet.component.html",
  styleUrls: ["./outlet.component.css"],
})
export class OutletComponent implements OnInit {
  retailers: Retailer[];
  showSpinner:boolean = true;
  constructor(private retailerService: RetailersService) {
    this.retailerService.getRetailers().subscribe((ret) => {
      console.log(ret);
      this.retailers = ret;
      this.showSpinner = false;
    });
  }

  ngOnInit() {}
  deleteOutlet($event, item) {
    this.showSpinner = true;
    this.retailerService.deleteRetailer(item);
    this.showSpinner = false;
  }
}
