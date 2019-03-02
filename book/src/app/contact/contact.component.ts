import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import {Http, Response} from '@angular/http';
import {HttpHeaders} from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss',
  	'../../assets/css/bootstrap3.css']
})
export class ContactComponent implements OnInit {

  model: any = {};

  constructor(public http:Http) { 
    this.http = http;
  }

  ngOnInit() {

  }

  onSubmit(form: NgForm){
  	if(form.form.status == 'INVALID'){
         return false;
      } else {

         const headers = new HttpHeaders().set("Access-Control-Allow-Origin", "http://localhost/");

	      var output: any = {
	        "contactname": form.value.contactname,
	        "contactemail": form.value.contactemail,
	        "contactphone": form.value.contactphone,
	        "contactmessage": form.value.contactmessage,
	      };
	      
	      this.http.post("http://localhost/Book/processing.php?method=addmessage", output)
	      .subscribe(
	         data => {
	            if(data.text().trim() == 'Success'){
	            	alert("Your message has been submitted. We will get back to you as soon as possible.");
	            	document.getElementById('reset-btn').click(); 
	            	return false;
	            }
	         },
	         error => {
	            console.log("Error", error);
	         }
	      );         
      }
  }

}
