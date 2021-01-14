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
          console.log(user);
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async signInWithGoogle(businessName) {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUser({ ...credential.user, businessName: businessName });
  }
  async alreadySignIn(){
    const provider = new auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithPopup(provider).then(credential=>{
      const userRef: AngularFirestoreDocument<User> = this.afs
        .collection<User>("users")
        .doc(credential.user.uid);
      userRef.snapshotChanges().subscribe(data=>{
        if(data.payload.exists){
          localStorage.setItem("currUid", data.payload.id);
          this.afs
            .collection<User>("users")
            .doc(credential.user.uid)
            .valueChanges()
            .subscribe((item: User) => {
              localStorage.setItem("businessName", String(item.businessName));
              this.router.navigate(["/", "home"]);
            });
        }else{
          return alert("No such account exist. Don't worry,make account.")
        }
      })

    })
    
  }
  async signOut() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem("currUid");
    localStorage.removeItem("businessName");
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
      businessName:user.businessName == undefined? "" :user.businessName
    };

    console.log(data);
    userRef.snapshotChanges().subscribe((prev) => {
      if (!prev.payload.exists) {
        userRef.set(data);
      }else{
        return alert('You have already registered. Go to signin below.');
      }
      localStorage.removeItem("currUid");
      localStorage.removeItem("businessName");
      localStorage.setItem("currUid", data.uid);
      localStorage.setItem("businessName",data.businessName)
      this.router.navigate(["/","home"]);
    });
  }
}
