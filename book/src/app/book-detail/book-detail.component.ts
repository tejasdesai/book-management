import { Component, OnInit, Input } from '@angular/core';
import {Http, Response} from '@angular/http';
import {HttpHeaders} from '@angular/common/http';
import { Router, NavigationStart } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss',
  '../../assets/css/bootstrap3.css']
})
export class BookDetailComponent implements OnInit {

	baseUrl: string = 'http://localhost/Book/';
	bookid: number;
	book:any[] = [];
	bookimage: string;
	dataLoaded: boolean = false;
  count: number;

  	constructor(public http:Http, private route: ActivatedRoute, private cookieService: CookieService){ 
  		this.http = http;
  	}

  	ngOnInit(){
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
         		this.bookimage = this.book[0].cover_image_path;
         		this.dataLoaded = true;
         	},
         	error => {
            	console.log("Error", error);
         	}
      	);
  	}

    addtocart(bookid){
        if(!this.cookieService.check('mysite_username')){
            alert("Please Login or Register to continue.");
            return false;
        }

        var output: any = {
            "customer-id": this.cookieService.get('mysite_userid'),
            "book-id": bookid,
            "timestamp": Number(new Date())
        };
        this.http.post("http://localhost/Book/processing.php?method=addtocart", output)
        .subscribe(
           data  => {
             if(data.text().trim() == 'Added'){
                alert("Book added to cart.");
                this.count = Number(localStorage.getItem('Cart_count')) + 1;
                localStorage.setItem('Cart_count', String(this.count));
                document.getElementById('lblCartCount').innerHTML = localStorage.getItem('Cart_count');
             }
           },
           error => {
              console.log("Error", error);
           }
        );
    }

}
