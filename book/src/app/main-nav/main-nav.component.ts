import { Component, OnInit } from '@angular/core';
import {Http, Response} from '@angular/http';
import {HttpHeaders} from '@angular/common/http';
import { Router, NavigationStart } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss',
  '../../assets/css/bootstrap3.css']
})
export class MainNavComponent implements OnInit {
  
  categories:any[] = [];
  // showCategories: boolean = true;
  
  constructor(private cookieService: CookieService, public http:Http, private router: Router) { 
      this.http = http;
  }

  ngOnInit() {
  	  
  	  const headers = new HttpHeaders().set("Access-Control-Allow-Origin", "http://localhost/");

      this.http.post("http://localhost/Book/processing.php?method=getcategories",'')
      .subscribe(
         data  => {
           this.categories = JSON.parse(data.text().trim());
           this.categories.push("All Books");
         },
         error => {
            console.log("Error", error);
         }
      );
  }

  selectCategory(comp_name: string, event) {
    localStorage.setItem('selected-listitem', comp_name);
    if(event.currentTarget.parentElement.querySelectorAll('.category_selected')[0]){
      event.currentTarget.parentElement.querySelectorAll('.category_selected')[0].classList.remove('category_selected');
    }
    event.currentTarget.classList.add('category_selected');
    window.location.href = '/';
  }

  showcats(){
    document.getElementById("cat_menu_ul").style.display = 'block';
  }

  hidecats(){
    document.getElementById("cat_menu_ul").style.display = 'none';
  }
  onLogout() {
    
    this.cookieService.delete('mysite_userid');
    this.cookieService.delete('mysite_username');
    this.cookieService.delete('admin');
    localStorage.removeItem('selected-listitem');
    localStorage.removeItem('Cart_count');
    localStorage.removeItem('searchkey');
    window.location.href = '/';
  }

}

window.onload = function() {
    if(localStorage.getItem('selected-listitem')){
      let target = localStorage.getItem('selected-listitem');
      document.getElementById(target).className = "category_selected";
    }
}
