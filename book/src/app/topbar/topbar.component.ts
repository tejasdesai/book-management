import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  isAdmin: boolean = false;

  constructor(private cookieService: CookieService, private router: Router) { 
  	router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
      	if(event['url'].includes('/admin')){
      		this.isAdmin = true;
      	}
      }
    });
  }

  ngOnInit() {
  }

  onLogout() {
  	
  	this.cookieService.delete('mysite_userid');
  	this.cookieService.delete('mysite_username');
    this.cookieService.delete('admin');
    localStorage.removeItem('selected-listitem');
    localStorage.removeItem('Cart_count');
  	window.location.href = '/';
  }

  get count(): any {
    return localStorage.getItem('Cart_count');
  }

}
