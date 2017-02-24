import { Routes } from '@angular/router';

import { MedecineInfoComponent } from './medecine-info/medecine-info.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { ShoppingCartListComponent } from './shopping-cart/shopping-cart-list/shopping-cart-list.component';
import { ShoppingCartCheckoutComponent } from './shopping-cart/shopping-cart-checkout/shopping-cart-checkout.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './auth-guard';
import { PharmacyOrderComponent } from './pharmacy-order/pharmacy-order.component';
import { MakeOrderComponent } from './make-order/make-order.component';
import { ContactusComponent } from './contactus/contactus.component';
import { DownloadComponent } from './download/download.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { PharmacyComponent } from './pharmacy/pharmacy.component';
import { SignupComponent } from './authentication/signup/signup.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'user', pathMatch: 'full', data: { title: 'Home' } },
  {
    path: 'user', component: UserComponent, data: { title: 'Home' }, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full', data: { title: 'Home' } },
      { path: 'home', component: HomeComponent, data: { title: 'Home' } },
      { path: 'signup', component: SignupComponent, data: { title: 'Sign Up' } },
      { path: 'myorders', component: MyOrdersComponent, canActivate: [AuthGuard], data: { title: 'My orders' } },
      { path: 'shoppinglist', component: ShoppingCartListComponent, pathMatch: 'full', canActivate: [AuthGuard], data: { title: '' } },
      { path: 'shoppinglist/checkout', component: ShoppingCartCheckoutComponent, canActivate: [AuthGuard], data: { title: '' } },
      { path: 'userprofile', component: UserProfileComponent, canActivate: [AuthGuard], data: { title: 'Profile' } },
      { path: 'contactus', component: ContactusComponent, data: { title: 'Contact Us' } },
      { path: 'download', component: DownloadComponent, data: { title: 'Downloads' } },
      { path: 'makeorder', component: MakeOrderComponent, data: { title: 'Order Your Medecine' } }
    ]
  },
  {
    path: 'pharmacy', component: PharmacyComponent, data: { title: 'Home' }, children: [
      { path: 'pharmacy_orders', component: PharmacyOrderComponent, canActivate: [AuthGuard], data: { title: '' } },
    ]
  },
  { path: '**', redirectTo: 'user', data: { title: 'Home' } }

];
