import { Component, OnInit } from '@angular/core';
import {Http, Response} from '@angular/http';
import {HttpHeaders} from '@angular/common/http';
import { Router, NavigationStart } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss',
  '../../assets/css/bootstrap3.css']
})
export class AdminComponent implements OnInit {

  sales: any[] = [];
  totalsaleamount: string;
  yearlysalesamount: string;
  monthlysalesamount: string;
  weeklysalesamount: string;
  todaysalesamount: string;
  customers: string;
  admins: string;
  books: string;
  donatedbooks: string;
  requestedbooks: string;

  constructor(private cookieService: CookieService, private router: Router, public http:Http) { 
  		this.http = http;
  }

  ngOnInit() {
  	  const headers = new HttpHeaders().set("Access-Control-Allow-Origin", "http://localhost/");

	  this.http.post("http://localhost/Book/processing.php?method=getstats",'')
	  .subscribe(
	     data  => {
	       this.sales = JSON.parse(data.text().trim());
	       this.totalsaleamount = String(Number(this.sales[0].totalsale).toFixed(2));
	       this.yearlysalesamount = String(Number(this.sales[1].totalsale).toFixed(2));
	       this.monthlysalesamount = String(Number(this.sales[2].totalsale).toFixed(2));
	       this.weeklysalesamount = String(Number(this.sales[3].totalsale).toFixed(2));
	       this.todaysalesamount = String(Number(this.sales[4].totalsale).toFixed(2));
	       this.customers = this.sales[5].totalsale;
	       this.admins = this.sales[6].totalsale;
	       this.books = this.sales[7].totalsale;
	       this.donatedbooks = this.sales[8].totalsale;
	       this.requestedbooks = this.sales[9].totalsale;
	     },
	     error => {
	        console.log("Error", error);
	     }
	  );
  }

}
