import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import {Http, Response} from '@angular/http';
import {HttpHeaders} from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss',
  	'../../assets/css/bootstrap3.css'
  ]
})
export class LoginComponent implements OnInit {

	model: any = {};
	cookieValue = 'UNKNOWN';

	constructor(public http:Http, private cookieService: CookieService) { 
		this.http = http;
	}

	ngOnInit() {
	}

	onSubmit(form: NgForm){
  		
		const headers = new HttpHeaders().set("Access-Control-Allow-Origin", "http://localhost/");
		if(!form.value.email || !form.value.password || !form.value.loginas){ return false;}
		var output: any = {
		    "email": form.value.email,
		    "password": form.value.password,
		    "loginas": form.value.loginas
		};
	  
	  	this.http.post("http://localhost/Book/processing.php?method=login", output)
	  	.subscribe(
	     	data => {
	        	if(data.text().trim() == 'Invalid User'){
	        		alert("Please check your email address/password.");
	        	} else if(data.text().trim() == 'Not Allowed'){
	        		alert("You are not allowed to login as administrator.");
	        	}else{
	        		var splitted = data.text().trim().split("==");
	        		var path = '/';
	        		localStorage.setItem('Cart_count', String(splitted[3]));
	                this.cookieService.set( 'mysite_userid', splitted[0], undefined, undefined, 'localhost' );
	        		this.cookieService.set( 'mysite_username', splitted[1], undefined, undefined, 'localhost' );
	        		if(splitted[2] == '1'){
	        			this.cookieService.set( 'admin', '1', undefined, undefined, 'localhost' );
	        			path = '/admin';
	        		}
	        		window.location.href = path;
	        	}
	     	},
	     	error => {
	        	console.log("Error", error);
	     	}
	  	);         
	}
}
