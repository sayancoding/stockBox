import { Injectable } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from "angularfire2/firestore";

import { Retailer } from "../model/retailer.model";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class RetailersService {
  retailersCollection: AngularFirestoreCollection<Retailer>;
  retailers: Observable<Retailer[]>;
  retailerDocu: AngularFirestoreDocument<Retailer>;

  constructor(public db: AngularFirestore) {
    this.retailersCollection = this.db.collection<Retailer>(`users/${localStorage.currUid}/retailers`);
    this.retailers = this.retailersCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((a) => {
          let data = a.payload.doc.data() as Retailer;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
  }

  getRetailers() {
    return this.retailers;
  }
  addRetailer(retlr: Retailer) {
    this.retailersCollection.add(retlr);
  }
  deleteRetailer(retlr: Retailer) {
    this.retailerDocu = this.db.doc(`retailers/${retlr.id}`);
    this.retailerDocu.delete();
  }
}
