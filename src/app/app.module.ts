import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EntrydetailsComponent } from './entrydetails/entrydetails.component';
import { EntryCompanyComponent } from './entrydetails/entry-company/entry-company.component';
import { EntryCategoryComponent } from './entrydetails/entry-category/entry-category.component';
import { EntryItemComponent } from './entrydetails/entry-item/entry-item.component';

@NgModule({
  declarations: [
    AppComponent,
    EntrydetailsComponent,
    EntryCompanyComponent,
    EntryCategoryComponent,
    EntryItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
