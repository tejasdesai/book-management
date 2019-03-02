import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AdminComponent} from './admin/admin.component';
import {AddAdminComponent} from './add-admin/add-admin.component';
import {AddBookComponent} from './add-book/add-book.component';
import {AddCategoryComponent} from './add-category/add-category.component';
import {EditBookComponent} from './edit-book/edit-book.component';
import {ViewStatsComponent} from './view-stats/view-stats.component';
import {BookDetailComponent} from './book-detail/book-detail.component';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {CheckoutComponent} from './checkout/checkout.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {DonateBookComponent} from './donate-book/donate-book.component';
import {ManageAvailabilityComponent} from './manage-availability/manage-availability.component';
import {OrdersComponent} from './orders/orders.component';
import {RequestBookComponent} from './request-book/request-book.component';
import {RequestedBooksComponent} from './requested-books/requested-books.component';
import {AboutComponent} from './about/about.component';
import {ContactComponent} from './contact/contact.component';
import {ContactMessagesComponent} from './contact-messages/contact-messages.component';
import {PolicyComponent} from './policy/policy.component';



const routes: Routes = [
{
	path: 'login',
	component: LoginComponent
},
{
	path: 'register',
	component: RegisterComponent
},
{
	path: 'admin',
	component: AdminComponent
},
{
	path: 'book-detail',
	component: BookDetailComponent
},
{
	path: 'shopping-cart',
	component: ShoppingCartComponent
},
{
	path: 'checkout',
	component: CheckoutComponent
},
{
	path: 'admin/add-admin',
	component: AddAdminComponent
},
{
	path: 'admin/add-book',
	component: AddBookComponent
},
{
	path: 'admin/add-category',
	component: AddCategoryComponent
},
{
	path: 'admin/edit-book',
	component: EditBookComponent
},
{
	path: 'admin/view-stats',
	component: ViewStatsComponent
},
{
	path: 'reset-password',
	component: ResetPasswordComponent
},
{
	path: 'admin/reset-password',
	component: ResetPasswordComponent
},
{
	path: 'admin/manage-books',
	component: ManageAvailabilityComponent
},
{
	path: 'admin/contact-messages',
	component: ContactMessagesComponent
},
{
	path: 'recover-password',
	component: RecoverPasswordComponent
},
{
	path: 'change-password',
	component: ChangePasswordComponent
},
{
	path: 'donate-book',
	component: DonateBookComponent
},
{
	path: 'orders',
	component: OrdersComponent
},
{
	path: 'request-book',
	component: RequestBookComponent
},
{
	path: 'admin/requested-books',
	component: RequestedBooksComponent
},
{
	path: 'about',
	component: AboutComponent
},
{
	path: 'contact',
	component: ContactComponent
},
{
	path: 'policy',
	component: PolicyComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
