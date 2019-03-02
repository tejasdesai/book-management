import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  View: string = 'home';
  showComponent: boolean = false;
  mainNavIndicator: boolean = true;

  ngOnInit() {
  }

  constructor(private router: Router) {
  // on route change to '/login', set the variable showComponent to false
    if(!localStorage.getItem('Cart_count')){
        localStorage.setItem('Cart_count', '0');
    }
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
      	if(event['url'].includes("/admin")){
      		this.mainNavIndicator = false;
      	}else{
          this.mainNavIndicator = true;
        }
        if (event['url'] == '/') {
        	this.showComponent = true;
        } else {
        	this.showComponent = false;
        }
      }
    });
  }
}
