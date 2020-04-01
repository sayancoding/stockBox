import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";

@Component({
  selector: 'app-summary-pannel',
  templateUrl: './summary-pannel.component.html',
  styleUrls: ['./summary-pannel.component.css']
})
export class SummaryPannelComponent implements OnInit {

  constructor() { }

  ngOnInit() {
     $(document).ready(function() {
       var w = $(window).width();
       $("#entryZone").click(function() {
         if(w<450)
         {
           alert(`Please swipe up to choose ☝`)
         }
       });
     });
  }

}
