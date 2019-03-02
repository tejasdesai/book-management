import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import {Http, Response} from '@angular/http';
import {HttpHeaders} from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss',
  	'../../assets/css/bootstrap3.css']
})
export class RecoverPasswordComponent implements OnInit {
  model: any = {};
  passcode: string;

  constructor(public http:Http, private cookieService: CookieService) { 
  	this.http = http;
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
    
    this.passcode = this.generatepasscode();

  	const headers = new HttpHeaders().set("Access-Control-Allow-Origin", "http://localhost/");
	  if(!form.value.email){ return false; }
  	var output: any = {
  	    "email": form.value.email,
        "passcode": this.passcode
  	};
  
  	this.http.post("http://localhost/Book/processing.php?method=checkifregistered", output)
  	.subscribe(
     	data => {
        	if(data.text().trim() == 'Found'){
        		this.recoverPassword(form.value.email);
        		alert("An email with one time passcode is sent to your registered email address.");
            window.location.href = '/change-password';
        	}else{
        		alert("This email is not registered. Please check.");
        	}
     	},
     	error => {
        	console.log("Error", error);
     	}
  	);  
  }
  recoverPassword(email){
		const headers = new HttpHeaders().set("Access-Control-Allow-Origin", "http://localhost:3245");
		
		var output: any = {
	      	"email": email,
	      	"passcode": this.passcode
	    };

 		this.http.post("http://localhost:3245/recover", output)
	  	.subscribe(
	  		data => {
	        	console.log("Email Sent");
	     	},
	     	error => {
	        	console.log("Error", error);
	     	}
	  	);	
	}
	generatepasscode() {
	  	var text = "";
	  	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	  	for (var i = 0; i < 8; i++)
	    	text += possible.charAt(Math.floor(Math.random() * possible.length));

	  	return text;
	}

}
