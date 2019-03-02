import { Component, OnInit } from '@angular/core';
import {Http, Response} from '@angular/http';
import {HttpHeaders} from '@angular/common/http';
import { Router, NavigationStart } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss',
  '../../assets/css/bootstrap3.css']
})
export class OrdersComponent implements OnInit {

  orderitems:any[] = [];
  products:any[] = [];
  baseUrl: string = 'http://localhost/Book/';

  constructor(public http:Http, private router: Router, private cookieService: CookieService) { 
  	this.http = http;
  }

  ngOnInit() {
  	var output: any = {
        "cust-id": this.cookieService.get('mysite_userid')
    };
  	this.http.post("http://localhost/Book/processing.php?method=getorders", output)
  	.subscribe(
     	data  => {
            this.orderitems = JSON.parse(data.text().trim());
            console.log(this.orderitems);
            for(var i=0; i < this.orderitems.length; i++){
              this.products[i] = JSON.parse(this.orderitems[i].products);
            }
            console.log(this.products);
     	},
     	error => {
        	console.log("Error", error);
     	}
  	);
  }

  getDate(timestamp) {
    var ts = Number(timestamp);
    var date = new Date(Number(ts));
    var dateString = date.toDateString();
    return dateString;
  }

  viewProduct(bookid){
    window.location.href = '/book-detail?id='+bookid;
  }

}
