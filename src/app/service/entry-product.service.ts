import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import { Product } from "../model/entryProduct.model";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class EntryProductService {
  productCollection: AngularFirestoreCollection<Product>;
  products: Observable<Product[]>;
  productDoc : AngularFirestoreDocument<Product>

  constructor(private db:AngularFirestore) {
    this.productCollection = this.db.collection<Product>('products');
    this.products = this.productCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          let data = a.payload.doc.data() as Product;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
  }
  addProduct(product:Product)
  {
    this.productCollection.add(product)
  }
  getProducts()
  {
    return this.products;
    console.log(this.products);
  }

  deleteProduct(prod:Product)
  {
    this.productDoc = this.db.doc(`products/${prod.id}`)
    this.productDoc.delete();
  }
}
