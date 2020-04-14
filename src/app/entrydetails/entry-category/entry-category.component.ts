import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Category } from "src/app/model/entryCategory.model";
import { EntryCategoryService } from "src/app/service/entry-category.service";

@Component({
  selector: "app-entry-category",
  templateUrl: "./entry-category.component.html",
  styleUrls: ["./entry-category.component.css"]
})
export class EntryCategoryComponent implements OnInit {
  categories: Category[];
  term: string;
  showSpinner:boolean = true;
  
  constructor(private _categoryNameService: EntryCategoryService) {
    this.showSpinner = true;
    this._categoryNameService.getCategoriesName().subscribe(cat => {
      this.categories = cat;
      setTimeout(() => {
        this.showSpinner = false;
      }, 200);
      console.log(this.categories);
    });
  }

  category: Category[];
  status = true;

  ngOnInit() {}

  entryCategory = new FormGroup({
    categoryName: new FormControl(null, [Validators.required])
  });
  onSubmit() {
    this.showSpinner = true
    console.log({ name: this.entryCategory.get("categoryName").value });
    for (let i = 0; i < this.categories.length; i++) {
      if (
        this.categories[i].name === this.entryCategory.get("categoryName").value
      ) {
        this.status = false;
        break;
      }
    }
    console.log(this.status);
    if (this.status) {
      this._categoryNameService.addCategory({
        name: this.entryCategory.get("categoryName").value
      });
      setTimeout(() => {
        this.showSpinner = false;
      }, 200);
      
      setTimeout(() => {
        this.entryCategory.reset();
        alert(`Category Added 🤘`);
      }, 1000);
    } else {
      alert("already exist ");
      this.entryCategory.reset();
    }
  }

  removeCategory($event, cat: Category) {
    this._categoryNameService.removeCat(cat);
  }
}
