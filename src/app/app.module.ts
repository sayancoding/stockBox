import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";

import { AngularFontAwesomeModule } from "angular-font-awesome";
import { Ng2SearchPipeModule } from "ng2-search-filter";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { EntryDetailsComponent } from "./entrydetails/entryDetails.component";
import { EntryCompanyComponent } from "./entrydetails/entry-company/entry-company.component";
import { EntryCategoryComponent } from "./entrydetails/entry-category/entry-category.component";
import { EntryItemComponent } from "./entrydetails/entry-item/entry-item.component";
import { environment } from "../environments/environment";
import { EnrtyCompanyService } from "./service/enrty-company.service";
import { HomeComponent } from "./home/home.component";
import { SummaryPannelComponent } from "./summary-pannel/summary-pannel.component";
import { EntryCategoryService } from "./service/entry-category.service";
import { SpinnerComponent } from './spinner/spinner.component';
import { EntryProductService } from './service/entry-product.service';
import { StockDetailsComponent } from './stock-details/stock-details.component';
import { ViewProductsComponent } from './stockDetails/view-products/view-products.component';
import { BillingComponent } from './billing/billing.component';
import { EventEmitter } from 'events';

@NgModule({
  declarations: [
    AppComponent,
    EntryDetailsComponent,
    EntryCompanyComponent,
    EntryCategoryComponent,
    EntryItemComponent,
    HomeComponent,
    SummaryPannelComponent,
    SpinnerComponent,
    StockDetailsComponent,
    ViewProductsComponent,
    BillingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, "inventory"),
    AngularFirestoreModule,
    AngularFontAwesomeModule,
    Ng2SearchPipeModule,
  ],
  providers: [
    EnrtyCompanyService,
    EntryCategoryService,
    EntryProductService,
    EventEmitter,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
