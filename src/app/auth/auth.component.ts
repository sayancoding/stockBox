import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
})
export class AuthComponent implements OnInit {
  constructor(public authService: AuthService) {}
  hashName: boolean = false;
  businessName = ""
  ngOnInit() {}
  checkName(businessName: HTMLInputElement) {
    if (businessName.value.length > 1) {
      this.hashName = true;
      this.businessName = businessName.value
    } else {
      alert("Give it valid name first");
    }
  }
  signIn(){
    this.authService.signInWithGoogle(this.businessName);
  }
}
