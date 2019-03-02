import { Component, OnInit } from '@angular/core';
import {Http, Response} from '@angular/http';
import {HttpHeaders} from '@angular/common/http';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-requested-books',
  templateUrl: './requested-books.component.html',
  styleUrls: ['./requested-books.component.scss']
})
export class RequestedBooksComponent implements OnInit {
  
  model: any = {};
  books:any[] = [];

  constructor(public http:Http, private router: Router){ 
   	this.http = http;
  }

  ngOnInit() {
  	  const headers = new HttpHeaders().set("Access-Control-Allow-Origin", "http://localhost/");

	  this.http.post("http://localhost/Book/processing.php?method=getrequestedbooks", '')
      	.subscribe(
         	data  => {
         		this.books = JSON.parse(data.text().trim());
         	},
         	error => {
            	console.log("Error", error);
         	}
      );
  }

  getDate(timestamp) {
    var ts = Number(timestamp);
    var date = new Date(ts*1000);
    var dateString = date.toDateString();
    return dateString;
  }

  notifyuser(emailid, bookname) {
  	var output: any = {
      	"email": emailid,
      	"bookname": bookname
    };

	this.http.post("http://localhost:3245/bookavailable", output)
  	.subscribe(
  		data => {
        	alert("Notification email sent.");
     	},
     	error => {
        	console.log("Error", error);
     	}
  	);	
  }

  deletereq(reqid) {
  	  const headers = new HttpHeaders().set("Access-Control-Allow-Origin", "http://localhost/");

  	  var output: any = {
        "reqid": reqid
      };

	  this.http.post("http://localhost/Book/processing.php?method=deleterequest", output)
      	.subscribe(
         	data  => {
         		if(data.text().trim() == 'deleted'){
         			alert("Request deleted successfully");
         			location.reload();
         		}
         	},
         	error => {
            	console.log("Error", error);
         	}
      );
  }

}
