import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";
import {AngularFireAuthModule} from "@angular/fire/auth"

import { AngularFontAwesomeModule } from "angular-font-awesome";
import { Ng2SearchPipeModule } from "ng2-search-filter";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { EntryDetailsComponent } from "./entrydetails/entryDetails.component";
import { EntryCompanyComponent } from "./entrydetails/entry-company/entry-company.component";
import { EntryCategoryComponent } from "./entrydetails/entry-category/entry-category.component";
import { EntryItemComponent } from "./entrydetails/entry-item/entry-item.component";
import { environment } from "../environments/environment.prod";
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
import { RetailersDetailsComponent } from './retailers-details/retailers-details.component';
import { RetailersService } from './service/retailers.service';
import { DebitCreditComponent } from './debit-credit/debit-credit.component';
import { NewCustomerComponent } from './debit-credit/new-customer/new-customer.component';
import { OldCustomerComponent } from './debit-credit/old-customer/old-customer.component';
import { OutletComponent } from './outlet/outlet.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthService } from "./service/auth.service";

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
    RetailersDetailsComponent,
    DebitCreditComponent,
    NewCustomerComponent,
    OldCustomerComponent,
    OutletComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, "inventory"),
    AngularFirestoreModule,
    AngularFontAwesomeModule,
    AngularFireAuthModule,
    Ng2SearchPipeModule,
  ],
  providers: [
    EnrtyCompanyService,
    EntryCategoryService,
    EntryProductService,
    RetailersService,
    AuthService,
    EventEmitter,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
