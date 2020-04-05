import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from "angularfire2/firestore";
import { Bills } from "../model/billsDetails.model";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class BillingService {
  billCollection: AngularFirestoreCollection<Bills>;
  bills: Observable<Bills[]>;
  billDoc: AngularFirestoreDocument<Bills>;

  constructor(private db: AngularFirestore) {
    this.billCollection = this.db.collection<Bills>("bills");
    this.bills = this.billCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((a) => {
          let data = a.payload.doc.data() as Bills;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
  }

  addBill(bills: Bills) {
    this.billCollection.add(bills);
  }
  getBills() {
    return this.bills;
    console.log(this.bills);
  }

  deleteBill(bill: Bills) {
    this.billDoc = this.db.doc(`products/${bill.id}`);
    this.billDoc.delete();
  }
}
