import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import {Http, Response} from '@angular/http';
import {HttpHeaders} from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-request-book',
  templateUrl: './request-book.component.html',
  styleUrls: ['./request-book.component.scss',
  	'../../assets/css/bootstrap3.css']
})
export class RequestBookComponent implements OnInit {

  model: any = {};

  constructor(public http:Http, private cookieService: CookieService) { 
  	this.http = http;
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
  	  
  	  const headers = new HttpHeaders().set("Access-Control-Allow-Origin", "http://localhost/");
  	  if(!form.value.email || !form.value.title){ return false;}
  	  
  	  var output: any = {
  	  	"userid": this.cookieService.get('mysite_userid'),
        "email": form.value.email,
        "title": form.value.title
      };


      this.http.post("http://localhost/Book/processing.php?method=requestbook", output)
      .subscribe(
         data  => {
         	if(data.text().trim() == 'Success'){
         		alert("Request submitted successfully. You will receive email once the requested book is available.");
         		//window.location.href = '/request-book';
             document.getElementById('reset-btn').click(); 
         	}
         },
         error => {
            console.log("Error", error);
            return false;
         }
      );
  }

}
