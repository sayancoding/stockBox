import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { auth } from "firebase/app";
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { User } from "../model/user.model";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  user$: Observable<any>;
  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private afs: AngularFirestore
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          console.log(user)
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async signInWithGoogle() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    // console.log(credential.user);
    return this.updateUser(credential.user);
  }
  async signOut() {
    await this.afAuth.auth.signOut();
    return this.router.navigate(["/"]);
  }
  updateUser(user) {
    const userRef: AngularFirestoreDocument<User> = this.afs
      .collection<User>("users")
      .doc(user.uid);
    
    const data = {
      uid: user.uid,
      email: user.email,
      photoURL: user.photoURL,
      displayName: user.displayName,
      somethingCustom:
        user.somethingCustom == undefined ? "" : user.somethingCustom,
    };
    
    console.log(data)
    userRef.snapshotChanges().subscribe((prev) => {
      if(!prev.payload.exists){
        userRef.set(data);
      }
      localStorage.removeItem("currUid");
      localStorage.setItem("currUid",data.uid);
    });
  }
}
