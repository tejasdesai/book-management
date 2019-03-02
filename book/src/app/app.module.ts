import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CreditCardDirectivesModule } from 'angular-cc-library';
import {HttpClientModule, HttpClientJsonpModule} from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopbarComponent } from './topbar/topbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SliderComponent } from './slider/slider.component';
import {SlideshowModule} from 'node_modules/ng-simple-slideshow';
import { MainNavComponent } from './main-nav/main-nav.component';
import { AdminComponent } from './admin/admin.component';
import { FieldErrorDisplayComponent } from './field-error-display/field-error-display.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { CookieService } from 'ngx-cookie-service';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { AddBookComponent } from './add-book/add-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { ViewStatsComponent } from './view-stats/view-stats.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ShowBooksComponent } from './show-books/show-books.component';
import { FooterComponent } from './footer/footer.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { DonateBookComponent } from './donate-book/donate-book.component';
import { ManageAvailabilityComponent } from './manage-availability/manage-availability.component';
import { OrdersComponent } from './orders/orders.component';
import { RequestBookComponent } from './request-book/request-book.component';
import { RequestedBooksComponent } from './requested-books/requested-books.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { ContactMessagesComponent } from './contact-messages/contact-messages.component';
import { PolicyComponent } from './policy/policy.component';
 
// import { PasswordValidator } from './shared/password.validator';


@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    LoginComponent,
    RegisterComponent,
    SidebarComponent,
    SliderComponent,
    MainNavComponent,
    AdminComponent,
    FieldErrorDisplayComponent,
    AdminSidebarComponent,
    AddAdminComponent,
    AddBookComponent,
    EditBookComponent,
    ViewStatsComponent,
    AddCategoryComponent,
    ChangePasswordComponent,
    ShowBooksComponent,
    FooterComponent,
    BookDetailComponent,
    ShoppingCartComponent,
    CheckoutComponent,
    ResetPasswordComponent,
    RecoverPasswordComponent,
    DonateBookComponent,
    ManageAvailabilityComponent,
    OrdersComponent,
    RequestBookComponent,
    RequestedBooksComponent,
    ContactComponent,
    AboutComponent,
    ContactMessagesComponent,
    PolicyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SlideshowModule,
    HttpModule,
    HttpClientModule, 
    HttpClientJsonpModule,
    CreditCardDirectivesModule,
    AngularFontAwesomeModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
