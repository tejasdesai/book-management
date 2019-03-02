import { Component, OnInit } from '@angular/core';
import {Http, Response} from '@angular/http';
import {HttpHeaders} from '@angular/common/http';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-manage-availability',
  templateUrl: './manage-availability.component.html',
  styleUrls: ['./manage-availability.component.scss',
  '../../assets/css/bootstrap3.css']
})
export class ManageAvailabilityComponent implements OnInit {

  model: any = {};
  books:any[] = [];

  baseUrl: string = 'http://localhost/Book/';
  selecteditem: string;
  search_key: string;

  constructor(public http:Http, private router: Router){ 
   	this.http = http;
  }

  ngOnInit() {

    if(localStorage.getItem('searchkey')){
      this.search_key = localStorage.getItem('searchkey');
      (<HTMLInputElement>document.getElementById('search-book')).value = localStorage.getItem('searchkey');
    } else {
      this.search_key = '';
    }
	  const headers = new HttpHeaders().set("Access-Control-Allow-Origin", "http://localhost/");

    var output: any = {
      "searchkey": this.search_key
   };

	  this.http.post("http://localhost/Book/processing.php?method=getbooks&&getall", output)
      	.subscribe(
         	data  => {
         		this.books = JSON.parse(data.text().trim());
         	},
         	error => {
            	console.log("Error", error);
         	}
      );
  }
  
  actions(bookid, action) {
	  const headers = new HttpHeaders().set("Access-Control-Allow-Origin", "http://localhost/");

	  var output: any = {
          "bookid": bookid,
          "action": action
      };

	  this.http.post("http://localhost/Book/processing.php?method=manageavailability", output)
      	.subscribe(
         	data  => {
         		if(data.text().trim() == 'Available'){
         			alert("Book marked available.");
         		} else if(data.text().trim() == 'Unavailable'){
         			alert("Book marked unavailable.");
         		}
         	},
         	error => {
            	console.log("Error", error);
         	}
      );  	
  }

  deletebook(bookid){
    const headers = new HttpHeaders().set("Access-Control-Allow-Origin", "http://localhost/");

    var output: any = {
          "bookid": bookid
    };

    this.http.post("http://localhost/Book/processing.php?method=deletebook", output)
        .subscribe(
           data  => {
             if(data.text().trim() == 'Removed'){
               alert("Book removed successfully.");
               location.reload();
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
