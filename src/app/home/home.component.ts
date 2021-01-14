import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { AuthService } from '../service/auth.service';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  businessName = "";
  constructor(private authService: AuthService) {
    this.businessName = localStorage.getItem("businessName");
  }
  isHidden: boolean = true;

  ngOnInit() {
    $(document).ready(function () {
      var isHidden = false;
      $(window).resize(function () {
        var w = $(window).width();
        if (w <= 860) {
          isHidden = false;
        } else {
          isHidden = true;
        }
      });
    });
  }

  toggleBtn() {
    this.isHidden = !this.isHidden;
  }
}
