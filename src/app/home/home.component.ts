import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  businessName = ""
  constructor(private authService:AuthService) { 
    this.businessName = localStorage.getItem("businessName")
  }

  ngOnInit() {
    $(document).ready(function(){
      var isHidden = false;
      $(window).resize(function(){
        var w = $(window).width();
        if(w<=860)
        {
          $(".sidebar").addClass("hidden");
          $(".main-container").addClass("large");
        }else{
          
          $(".sidebar").removeClass("hidden");
          $(".main-container").removeClass("large");
        }
      })
      
      $("#toggle").click(function() {
        isHidden = !isHidden;
        if (isHidden) {
          $(".sidebar").addClass("hidden");
          $(".main-container").addClass("large");
        } else {
          $(".sidebar").removeClass("hidden");
          $(".main-container").removeClass("large");
        }
      });
    })
  }

}
