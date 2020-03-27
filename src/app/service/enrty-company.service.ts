import { Injectable } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";

import {Company} from '../model/enrtyCompany.model'
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class EnrtyCompanyService {
  companiesCollection: AngularFirestoreCollection<Company>;
  companies: Observable<Company[]>;

  constructor(public db: AngularFirestore) {
    this.companies = this.db.collection("company").valueChanges();
    this.companiesCollection = this.db.collection("company");
    // this.companies = this.db.collection('company').snapshotChanges().map(changes => {
    //   return changes.map(a=>{
    //     const data = a.payload.doc.data() as Company;
    //     return data
    //   })
    // });
  }
  getCompanyName()
  {
    return this.companies;
  }
  addCompany(cmp:Company)
  {
    this.companiesCollection.add(cmp)
  }
}
