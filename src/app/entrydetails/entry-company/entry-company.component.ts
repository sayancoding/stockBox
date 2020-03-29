import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { EnrtyCompanyService } from "src/app/service/enrty-company.service";
import { Company } from "src/app/model/enrtyCompany.model";

@Component({
  selector: "app-entry-company",
  templateUrl: "./entry-company.component.html",
  styleUrls: ["./entry-company.component.css"]
})
export class EntryCompanyComponent implements OnInit {
  companies: Company[];
  term: string;

  showSpinner:boolean = true;

  constructor(private _comanyNameService: EnrtyCompanyService) {}
  getCompanyName() {
    this.showSpinner = true;
    this._comanyNameService.getCompanyName().subscribe(cmp => {
      this.companies = cmp;
      setTimeout(() => {
        this.showSpinner = false;
      }, 500);
      console.log(this.companies);
    });
  }
  ngOnInit() {
    this.getCompanyName();
  }

  entryCompanyName = new FormGroup({
    companyName: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[a-zA-Z]+$/)
    ]),
    companyAddress: new FormControl(null, [Validators.required]),
    companyContact: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[0-9]\d*$/),
      Validators.minLength(10)
    ])
  });

  onSubmit() {
    console.log({
      name: this.entryCompanyName.get("companyName").value,
      address: this.entryCompanyName.get("companyAddress").value,
      contact: this.entryCompanyName.get("companyContact").value
    });
    this.addToFirebase();

    // alert(`company details are stored 🤘`)
  }
  addToFirebase() {
    this._comanyNameService.addCompany({
      name: this.entryCompanyName.get("companyName").value,
      address: this.entryCompanyName.get("companyAddress").value,
      contact: this.entryCompanyName.get("companyContact").value
    });

    this.getCompanyName();
    this.entryCompanyName.reset();
    setTimeout(() => {
      this.entryCompanyName.reset();
      alert(`company details are stored 🤘`);
    }, 1000);
  }

  deleteComp(event, cmp) {
    this._comanyNameService.deleteCompany(cmp);
  }
}
