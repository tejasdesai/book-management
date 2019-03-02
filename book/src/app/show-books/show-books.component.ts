import { Component, OnInit, Input } from '@angular/core';
import {Http, Response} from '@angular/http';
import {HttpHeaders} from '@angular/common/http';
import { Router, NavigationStart } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-show-books',
  templateUrl: './show-books.component.html',
  styleUrls: ['./show-books.component.scss',
  '../../assets/css/bootstrap3.css']
})
export class ShowBooksComponent implements OnInit {

	model: any = {};
	books:any[] = [];
  count: number = 0;
	baseUrl: string = 'http://localhost/Book/';
  selecteditem: string;
  search_key: string;

    constructor(public http:Http, private router: Router, private cookieService: CookieService){ 
   		this.http = http;
    }

   ngOnInit() {

   		 const headers = new HttpHeaders().set("Access-Control-Allow-Origin", "http://localhost/");

        if(localStorage.getItem('selected-listitem')){
          this.selecteditem = localStorage.getItem('selected-listitem');
        } else {
          this.selecteditem = '';
        }

        if(localStorage.getItem('searchkey')){
          this.search_key = localStorage.getItem('searchkey');
          (<HTMLInputElement>document.getElementById('search-book')).value = localStorage.getItem('searchkey');
        } else {
          this.search_key = '';
        }

       var output: any = {
          "selectedcat": this.selecteditem,
          "searchkey": this.search_key
       };

      this.http.post("http://localhost/Book/processing.php?method=getbooks", output)
      	.subscribe(
         	data  => {
         		this.books = JSON.parse(data.text().trim());
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
    searchbook(){
      var searchStr = (<HTMLInputElement>document.getElementById('search-book')).value;
      localStorage.setItem('searchkey', searchStr);
      location.reload();
    }
}









