import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import {Http, Response} from '@angular/http';
import {HttpHeaders} from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss',
  	'../../assets/css/bootstrap3.css']
})
export class ResetPasswordComponent implements OnInit {

  password: string;
  confirmpassword: string;
  IsMatch: boolean;
  methodname: string;
  url: string;

  model: any = {};

  constructor(public http:Http, private cookieService: CookieService) { 
  	this.http = http;
  }

  ngOnInit() {
  	this.IsMatch=false;
  }

  onSubmit(form: NgForm){
  		// var methodname = '';
  		if(this.cookieService.check('admin') && Number(this.cookieService.get('admin')) == 1){
  			this.methodname = 'resetadminpassword';
  			this.url = '/admin';
  		} else {
  			this.methodname = 'resetpassword';
  			this.url = '/';
  		}
  		if ((form.value.newpass != form.value.confirmpassword) || form.value.confirmpassword==undefined) {
  			form.controls['confirmpassword'].setErrors({'incorrect': true});
		    this.IsMatch=true;
		    return false;
		  } else {

          const headers = new HttpHeaders().set("Access-Control-Allow-Origin", "http://localhost/");

          var output: any = {
          	"cid": this.cookieService.get('mysite_userid'),
            "oldpass": form.value.oldpass,
            "newpass": form.value.newpass
          };
          
          this.http.post("http://localhost/Book/processing.php?method="+this.methodname, output)
          .subscribe(
             data => {
                if(data.text().trim() == 'Updated'){
                  alert("You have successfully updated your password..");
                  window.location.href = this.url;
                }else if(data.text().trim() == 'Incorrect'){
                  alert("Incorrect passowrd. Please try again.");
                }
             },
             error => {
                console.log("Error", error);
             }
          );         
      }
  }

}
