import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import {Http, Response} from '@angular/http';
import {HttpHeaders} from '@angular/common/http';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss',
  	'../../assets/css/bootstrap3.css'
  ]
})

export class RegisterComponent implements OnInit {
	
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
            "fname": form.value.firstname,
            "lname": form.value.lastname,
            "email": form.value.loginemail,
            "contact": form.value.contact,
            "address": form.value.address,
            "password": form.value.password,
            "isAdmin": "0"
          };
          
          this.http.post("http://localhost/Book/processing.php?method=register", output)
          .subscribe(
             data => {
                if(data.text().trim() == 'User Exists'){
                  alert("Email address already used. Please try again.");
                }else{
                  alert("You have successfully created account. Please log in to continue.");
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
