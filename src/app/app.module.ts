import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule} from 'angularfire2/index';
import { RouterModule } from '@angular/router';
import { TranslateModule } from 'ng2-translate';
import { AgmCoreModule } from 'angular2-google-maps/core';

import { AppComponent } from './app.component';
import { MedecineService } from './medecine.service';
import { firebaseConfig } from '../environments/firebase.config';
import { HeaderComponent } from './header/header.component';
import { MedecineInfoComponent } from './medecine-info/medecine-info.component';
import { SearchComponent } from './medecine-info/search/search.component';
import { DetailsComponent } from './medecine-info/details/details.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthenticationService } from './authentication.service';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { appRoutes } from './app.routes';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { ShoppingCartWidgetComponent } from './shopping-cart/shopping-cart-widget/shopping-cart-widget.component';
import { ShoppingListService } from './shopping-cart/shopping-list.service';
import { ShoppingCartListComponent } from './shopping-cart/shopping-cart-list/shopping-cart-list.component';
import { MultiplyPipe } from './multiply.pipe';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ShoppingCartCheckoutComponent } from './shopping-cart/shopping-cart-checkout/shopping-cart-checkout.component';
import { UserService } from './user.service';
import { FormatAddressPipe } from './format-address.pipe';
import { OrderService } from './order.service';
import { FooterComponent } from './footer/footer.component';
import { AuthGuard } from './auth-guard';
import { PharmacyOrderComponent } from './pharmacy-order/pharmacy-order.component';
import { OfflineIndicatorComponent } from './offline-indicator/offline-indicator.component';
import { MakeOrderComponent } from './make-order/make-order.component';
import { ContactusComponent } from './contactus/contactus.component';
import { OfflineService } from './offline.service';
import { AdsComponent } from './ads/ads.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FileUploadService } from './file-upload/file-upload.service';
import { SelectLangComponent } from './select-lang/select-lang.component';
import { AddressComponent } from './address/address.component';
import { AddressService } from './address/address.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MedecineInfoComponent,
    SearchComponent,
    DetailsComponent,
    AuthenticationComponent,
    LoginComponent,
    SignupComponent,
    MyOrdersComponent,
    ShoppingCartWidgetComponent,
    ShoppingCartListComponent,
    MultiplyPipe,
    UserProfileComponent,
    ShoppingCartCheckoutComponent,
    FormatAddressPipe,
    FooterComponent,
    PharmacyOrderComponent,
    OfflineIndicatorComponent,
    MakeOrderComponent,
    ContactusComponent,
    AdsComponent,
    FileUploadComponent,
    SelectLangComponent,
    AddressComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig),
    TranslateModule.forRoot(),
    AgmCoreModule.forRoot({apiKey: 'AIzaSyCFuTMgaFJhBp4gD_-CPm_zzpoiNF-y7MY'})
  ],
  providers: [MedecineService,
    AuthenticationService,
    ShoppingListService,
    UserService,
    OrderService,
    AuthGuard,
    OfflineService,
    FileUploadService,
    AddressService],
  bootstrap: [AppComponent]
})
export class AppModule { }
