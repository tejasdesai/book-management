import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import {Http, Response} from '@angular/http';
import {HttpHeaders} from '@angular/common/http';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss',
  	'../../assets/css/bootstrap3.css']
})
export class ChangePasswordComponent implements OnInit {

  password: string;
  confirmpassword: string;
  IsMatch: boolean;

  model: any = {};

  constructor(public http:Http) { 
  	this.http = http;
  }

  ngOnInit() {
  	this.IsMatch=false;
  }

  onSubmit(form: NgForm){
      
	  if ((form.value.password != form.value.confirmpassword) || form.value.confirmpassword==undefined) {
	    form.controls['confirmpassword'].setErrors({'incorrect': true});
	    this.IsMatch=true;
	    return false;
	   }
	  if(form.form.status == 'INVALID'){
	    return false;
	  } else {

	      const headers = new HttpHeaders().set("Access-Control-Allow-Origin", "http://localhost/");

	      var output: any = {
            "email": form.value.loginemail,
	        "passcode": form.value.passcode,
	        "password": form.value.password
	      };
	      
	      this.http.post("http://localhost/Book/processing.php?method=recoverpassword", output)
	      .subscribe(
	         data => {
	            if(data.text().trim() == 'Incorrect Passcode'){
	             	alert("Passcode is incorrect. Please try again.");
	            } else if(data.text().trim() == 'Passcode Expired'){
	            	alert("Your passcode has expired. Please try resending it.");
	            	window.location.href = '/recover-password';
	            } else if (data.text().trim() == 'Password Updated'){
	              	alert("Password updated successfully. Please log in to continue.");
	             	window.location.href = '/login';
	            }
	         },
	         error => {
	            console.log("Error", error);
	         }
	      );         
	  }
  }

}
