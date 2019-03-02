import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import {Http, Response} from '@angular/http';
import {HttpHeaders} from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss',
  	'../../assets/css/bootstrap3.css']
})
export class AddBookComponent implements OnInit {

  model: any = {};
  categories:any[] = [];
  files:any;
  
  constructor(public http:Http) { 
      this.http = http;
  }

  ngOnInit() {
  	  
  	  const headers = new HttpHeaders().set("Access-Control-Allow-Origin", "http://localhost/");

      this.http.post("http://localhost/Book/processing.php?method=getcategories",'')
      .subscribe(
         data  => {
         	this.categories = JSON.parse(data.text().trim());
         },
         error => {
            console.log("Error", error);
         }
      );
  }

  onFileChange(event) {    
     this.files = event.target.files[0];
  }

  onSubmit(form: NgForm){
  	  
  	  let body = new FormData();
      body.append('image', this.files);	

      const headers = new HttpHeaders().set("Access-Control-Allow-Origin", "http://localhost/");
  	  if(!form.value.category || !form.value.copies || !form.value.author || !form.value.title || !form.value.cost || !form.value.cimage || !form.value.donate){ return false;}
  	  
  	  var output: any = {
        "category": form.value.category,
        "copies": form.value.copies,
        "isbn": form.value.isbn,
        "author": form.value.author,
        "publisher": form.value.publisher,
        "title": form.value.title,
        "cost": form.value.cost,
        "subject": form.value.subject,
        "cimage": this.files.name,
        "donate": form.value.donate,
        "approved": "1"
      };


      this.http.post("http://localhost/Book/processing.php?method=addbook", output)
      .subscribe(
         data  => {
         	if(data.text().trim() == 'Book Exists'){
         		alert("Book with same title already exists.");
         		return false;
         	}else{
         		alert("Book added successfully.");
            document.getElementById('reset-btn').click(); 
         	}
         },
         error => {
            console.log("Error", error);
            return false;
         }
      );

      this.http.post("http://localhost/Book/processing.php?method=uploadfile", body)
      .subscribe(
         data  => {
         },
         error => {
            console.log("Error", error);
         }
      );
  }

}
