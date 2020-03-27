import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EntryDetailsComponent } from './entrydetails/entryDetails.component';
import { SummaryPannelComponent } from './summary-pannel/summary-pannel.component';


const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo:"/home" },
  { path: "home",
    component: HomeComponent,
    children:[
      { path: "", component: SummaryPannelComponent},
      { path: "entryZone", component: EntryDetailsComponent },
      { path: "show", component: EntryDetailsComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
