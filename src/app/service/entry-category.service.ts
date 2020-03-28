import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection } from 'angularfire2/firestore'
import { Category } from '../model/entryCategory.model';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class EntryCategoryService {
  categoryCollection: AngularFirestoreCollection<Category>;
  categories: Observable<Category[]>;

  constructor(public db: AngularFirestore) {
    this.categoryCollection = this.db.collection<Category>("category");
    this.categories = this.categoryCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          let data = a.payload.doc.data() as Category;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
  }

  getCategoriesName() {
    return this.categories;
  }

  addCategory(cat: Category) {
    this.categoryCollection.add(cat);
  }
}
