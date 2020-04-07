import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EntryDetailsComponent } from './entrydetails/entryDetails.component';
import { SummaryPannelComponent } from './summary-pannel/summary-pannel.component';
import { EntryCompanyComponent } from './entrydetails/entry-company/entry-company.component';
import { EntryCategoryComponent } from './entrydetails/entry-category/entry-category.component';
import { EntryItemComponent } from './entrydetails/entry-item/entry-item.component';
import { StockDetailsComponent } from './stock-details/stock-details.component';
import { ViewProductsComponent } from './stockDetails/view-products/view-products.component';
import { BillingComponent } from './billing/billing.component';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "/home" },
  {
    path: "home",
    component: HomeComponent,
    children: [
      {
        path: "",
        // pathMatch:'full',
        component: SummaryPannelComponent,
        children: [
          { path: "entryZone", component: EntryDetailsComponent },
          { path: "stock", component: StockDetailsComponent }
        ]
      },
      {
        path: "company-entry",
        component: EntryCompanyComponent
      },
      {
        path: "category-entry",
        component: EntryCategoryComponent
      },
      {
        path: "product-entry",
        component: EntryItemComponent
      },
      {
        path: "products-view",
        component: ViewProductsComponent
      },
      {
        path: "billing",
        component: BillingComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
