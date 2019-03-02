import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent implements OnInit {

  constructor(private cookieService: CookieService) { }

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

}
