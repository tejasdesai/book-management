import { Component, OnInit } from '@angular/core';
import {Http, Response} from '@angular/http';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import {HttpHeaders} from '@angular/common/http';
import { Router, NavigationStart } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NgForm } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { CreditCardValidator } from 'angular-cc-library';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss',
  '../../assets/css/bootstrap3.css']
})
export class CheckoutComponent implements OnInit {

  cartitems:any[] = [];
  baseUrl: string = 'http://localhost/Book/';
  taxvalue: string;
  cartvalue: number = 0;
  totalvalue: string;
  model: any = {};
  form: FormGroup;
  submitted: boolean = false;
  years:any[] = [];

  constructor(public http:Http, private router: Router, private cookieService: CookieService, private _fb: FormBuilder) { 
  	this.http = http;
  }

  ngOnInit() {

  	for(var i=2018; i<= 2040; i++){
  		this.years.push(i);
  	}

  	this.form = this._fb.group({
      creditCard: ['', [<any>CreditCardValidator.validateCCNumber]],
      expirationDate: ['', [<any>CreditCardValidator.validateExpDate]],
      cvc: ['', [<any>Validators.required, <any>Validators.minLength(3), <any>Validators.maxLength(4)]] 
    });
  	
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

  onSubmit(form: NgForm){

  	if(form.form.status == 'INVALID'){
  			return false;
  	}
  	const headers = new HttpHeaders().set("Access-Control-Allow-Origin", "http://localhost/");
		
		var output: any = {
		    "fullname": form.value.fullname,
		    "email": form.value.email,
		    "address": form.value.address,
		    "city": form.value.city,
		    "state": form.value.state,
		    "zip": form.value.zip,
		    "amount": Number(this.totalvalue),
		    "products": this.cartitems,
		    "tax_collected": Number(this.taxvalue),
		    "customer_id": this.cookieService.get('mysite_userid'),
		    "date": Number(new Date())
		};

		this.http.post("http://localhost/Book/processing.php?method=addtransaction", output)
	  	.subscribe(
	  		data => {
	        	if(data.text().trim() == 'Success'){
                  alert("Order Placed Successfully.");
				          localStorage.setItem('Cart_count', '0');
                  window.location.href = '/';
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