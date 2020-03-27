import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { EnrtyCompanyService } from "src/app/service/enrty-company.service";
import { Company } from "src/app/model/enrtyCompany.model";

@Component({
  selector: "app-entry-company",
  templateUrl: "./entry-company.component.html",
  styleUrls: ["./entry-company.component.css"]
})
export class EntryCompanyComponent implements OnInit {
  companies: Company[];

  constructor(private _comanyNameService: EnrtyCompanyService) {}
  getCompanyName() {
    this._comanyNameService.getCompanyName().subscribe(cmp => {
      this.companies = cmp;
      console.log(this.companies);
    });
  }
  ngOnInit() {
    this.getCompanyName();
  }

  entryCompanyName = new FormGroup({
    companyName: new FormControl(null)
  });

  onSubmit() {
    console.log({ name: this.entryCompanyName.get("companyName").value });
    this.addToFirebase();
  }
  addToFirebase() {
    this._comanyNameService.addCompany({
      name: this.entryCompanyName.get("companyName").value
    });

    this.getCompanyName();
  }

  deleteComp(event,cmp)
  {
    this._comanyNameService.deleteCompany(cmp);
  }
}
