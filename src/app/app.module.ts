import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2'
import { AngularFirestoreModule } from 'angularfire2/firestore'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EntryDetailsComponent } from './entrydetails/entryDetails.component';
import { EntryCompanyComponent } from './entrydetails/entry-company/entry-company.component';
import { EntryCategoryComponent } from './entrydetails/entry-category/entry-category.component';
import { EntryItemComponent } from './entrydetails/entry-item/entry-item.component';
import { environment } from '../environments/environment';
import { EnrtyCompanyService } from './service/enrty-company.service';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    EntryDetailsComponent,
    EntryCompanyComponent,
    EntryCategoryComponent,
    EntryItemComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, "inventory"),
    AngularFirestoreModule
  ],
  providers: [EnrtyCompanyService],
  bootstrap: [AppComponent]
})
export class AppModule {}
