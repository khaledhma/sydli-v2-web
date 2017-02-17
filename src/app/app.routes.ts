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

export const appRoutes: Routes = [
  { path: '', component: MedecineInfoComponent, pathMatch: 'full', data: {title: 'Home'} },
  { path: 'myorders', component: MyOrdersComponent, canActivate: [AuthGuard], data: {title: 'My orders'} },
  { path: 'pharmacy_orders', component: PharmacyOrderComponent, canActivate: [AuthGuard], data: {title: ''} },
  { path: 'shoppinglist', component: ShoppingCartListComponent, pathMatch: 'full', canActivate: [AuthGuard], data: {title: ''} },
  { path: 'shoppinglist/checkout', component: ShoppingCartCheckoutComponent, canActivate: [AuthGuard], data: {title: ''} },
  { path: 'userprofile', component: UserProfileComponent, canActivate: [AuthGuard], data: {title: 'Profile'} },
  { path: 'contactus', component: ContactusComponent, data: {title: 'Contact Us'} },
  { path: 'makeorder', component: MakeOrderComponent, data: {title: 'Order Your Medecine'} },
  { path: '**', component: MedecineInfoComponent, data: {title: 'Home'} }
];
