import { Component, OnInit } from '@angular/core';
import {Http, Response} from '@angular/http';
import {HttpHeaders} from '@angular/common/http';
import { Router, NavigationStart } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss',
  '../../assets/css/bootstrap3.css']
})
export class ShoppingCartComponent implements OnInit {

  cartitems:any[] = [];
  baseUrl: string = 'http://localhost/Book/';
  taxvalue: string;
  cartvalue: number = 0;
  totalvalue: string;

  constructor(public http:Http, private router: Router, private cookieService: CookieService) { 
  	this.http = http;
  }

  ngOnInit() {
  	var output: any = {
        "cust-id": this.cookieService.get('mysite_userid')
    };
  	this.http.post("http://localhost/Book/processing.php?method=getcartitems", output)
  	.subscribe(
     	data  => {
     		this.cartitems = JSON.parse(data.text().trim());
     		for (let key in this.cartitems) {
			    let value = this.cartitems[key];
			    this.cartvalue = Number(this.cartvalue + Number(value.cost)); 
			}
			this.taxvalue = String((this.cartvalue * 0.0885).toFixed(2));
			this.totalvalue = String(this.cartvalue + Number(this.taxvalue));
     	},
     	error => {
        	console.log("Error", error);
     	}
  	);
  }
  remove_item(book_id){
  	var output: any = {
  		"cust-id": this.cookieService.get('mysite_userid'),
        "book-id": book_id
    };
  	this.http.post("http://localhost/Book/processing.php?method=deletecartitem", output)
  	.subscribe(
     	data  => {
     		 
     		var count = Number(localStorage.getItem('Cart_count')) - 1;
			localStorage.setItem('Cart_count', String(count));

     		if(data.text().trim() == 'Item Deleted'){
     			window.location.href = '/shopping-cart';
     		}
     	},
     	error => {
        	console.log("Error", error);
     	}
  	);
  }
  viewProduct(bookid){
  	window.location.href = '/book-detail?id='+bookid;
  }

}
