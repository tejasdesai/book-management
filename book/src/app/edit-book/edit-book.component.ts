import { Component, OnInit, Input } from '@angular/core';
import {Http, Response} from '@angular/http';
import {HttpHeaders} from '@angular/common/http';
import { Router, NavigationStart } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss',
  '../../assets/css/bootstrap3.css']
})
export class EditBookComponent implements OnInit {
  
  model: any = {};
  baseUrl: string = 'http://localhost/Book/';
  bookid: number;
  book:any[] = [];
  categories:any[] = [];
  bookimage: string;
  dataLoaded: boolean = false;
  count: number;
  
  constructor(public http:Http, private route: ActivatedRoute, private cookieService: CookieService) { 
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
  	this.route.queryParams
  	.subscribe(params => {
    	this.bookid = params.id;
  	});
  	var output: any = {
        "book-id": this.bookid
    };

  	this.http.post("http://localhost/Book/processing.php?method=getbookdetail", output)
  	.subscribe(
     	data  => {
     		this.book = JSON.parse(data.text().trim());
     		this.model.category = this.book[0].category;
     		this.model.copies = this.book[0].available_copies;
     		this.model.isbn = this.book[0].isbn;
     		this.model.author = this.book[0].authors;
     		this.model.publisher = this.book[0].publishers;
     		this.model.title = this.book[0].title;
     		this.model.cost = this.book[0].cost;
     		this.model.subject = this.book[0].subject;
     		//this.model.cimage = this.book[0].cover_image_path;
     		if(this.book[0].is_donated == '1'){
     			this.model.donate = 'yes';
     		} else {
     			this.model.donate = 'no';
     		}
     		this.bookimage = this.book[0].cover_image_path;
     		this.dataLoaded = true;
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
  	// let body = new FormData();
   //  body.append('image', this.files);	

    const headers = new HttpHeaders().set("Access-Control-Allow-Origin", "http://localhost/"); 
  	var output: any = {
  		"bookid": this.bookid,
        "category": form.value.category,
        "copies": form.value.copies,
        "isbn": form.value.isbn,
        "author": form.value.author,
        "publisher": form.value.publisher,
        "title": form.value.title,
        "cost": form.value.cost,
        "subject": form.value.subject,
        "donate": form.value.donate
    };


    this.http.post("http://localhost/Book/processing.php?method=updatebook", output)
      .subscribe(
         data  => {
         	if(data.text().trim() == 'Book Updated'){
         		alert("Book updated successfully.");
         		window.location.href = '/admin/manage-books';
         	}
         },
         error => {
            console.log("Error", error);
            return false;
         }
    );

    // this.http.post("http://localhost/Book/processing.php?method=uploadfile", body)
    //   .subscribe(
    //      data  => {
    //      },
    //      error => {
    //         console.log("Error", error);
    //      }
    // );
  }

}
