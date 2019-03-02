import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import {Http, Response} from '@angular/http';
import {HttpHeaders} from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss',
  	'../../assets/css/bootstrap3.css']
})
export class AddCategoryComponent implements OnInit {


	model: any = {};
  	constructor(public http:Http) { 
      this.http = http;
    }

  	ngOnInit() {
  	}

  	onSubmit(form: NgForm){
  		const headers = new HttpHeaders().set("Access-Control-Allow-Origin", "http://localhost/");

        var output: any = {
        	"cname": form.value.category,
        };
          
      	this.http.post("http://localhost/Book/processing.php?method=addcategory", output)
      		.subscribe(
         		data => {
            		if(data.text().trim() == 'Category Exists'){
              			alert("This category already exists. Please try again.");
            		}else{
              			alert("You have successfully added a category.");
              			document.getElementById('reset-btn').click(); 
            		}
         		},
         		error => {
            		console.log("Error", error);
         		}
      	);         
    }

}
