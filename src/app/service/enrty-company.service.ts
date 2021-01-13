import { Injectable } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";

import {Company} from '../model/enrtyCompany.model'
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class EnrtyCompanyService {
  companiesCollection: AngularFirestoreCollection<Company>;
  companies: Observable<Company[]>;
  companyDocu:AngularFirestoreDocument<Company>;

  constructor(public db: AngularFirestore) {
    this.companiesCollection = this.db.collection<Company>(`users/${localStorage.currUid}/company`);
    this.companies = this.companiesCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          let data = a.payload.doc.data() as Company;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );

  }
  getCompanyName() {
    return this.companies;
  }
  addCompany(cmp: Company) {
    this.companiesCollection.add(cmp);
  }
  deleteCompany(cmp:Company)
  {
    this.companyDocu = this.db.doc(`company/${cmp.id}`);
    this.companyDocu.delete();
  }
}
