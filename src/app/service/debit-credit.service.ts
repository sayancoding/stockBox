import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from "angularfire2/firestore";
import { DebitDetails } from "../model/debitDetails.model";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class DebitCreditService {
  debitCreditsCollection: AngularFirestoreCollection<DebitDetails>;
  debitCredits: Observable<DebitDetails[]>;
  debitCreditDoc: AngularFirestoreDocument<DebitDetails>;

  constructor(public db: AngularFirestore) {
    this.debitCreditsCollection = this.db.collection<DebitDetails>(
      "debitCredits"
    );
    this.debitCredits = this.debitCreditsCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((a) => {
          let data = a.payload.doc.data() as DebitDetails;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
  }

  addRecord(dc: DebitDetails) {
    this.debitCreditsCollection.add(dc);
  }
  getRecords() {
    return this.debitCredits;
  }
  removeRecord(dc: DebitDetails) {
    this.debitCreditDoc = this.db.doc(`debitCredits/${dc.id}`);
    this.debitCreditDoc.delete();
  }
  updateRecord(dc: DebitDetails) {
    this.debitCreditDoc = this.db.doc(`debitCredits/${dc.id}`);
    this.debitCreditDoc.update(dc);
  }
}
