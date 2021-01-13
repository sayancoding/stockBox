import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
})
export class AuthComponent implements OnInit {
  constructor(public authService: AuthService,private router:Router) {
    if(!!localStorage.getItem("currUid")){
      this.router.navigate(["/","home"])
    }
  }
  hashName: boolean = false;
  businessName = ""
  ngOnInit() {}
  checkName(businessName: HTMLInputElement) {
    if (businessName.value.length > 1) {
      this.hashName = true;
      this.businessName = businessName.value
    } else {
      alert("First we need your Business name");
    }
  }
  signIn(){
    this.authService.signInWithGoogle(this.businessName);
  }
  alreadySignIn(){
    this.authService.alreadySignIn();
  }
}
