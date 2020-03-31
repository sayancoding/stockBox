import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function(){
      var isHidden = false;
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
