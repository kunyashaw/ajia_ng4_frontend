import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.route'
import { HttpModule, JsonpModule } from '@angular/http'
import { HttpService } from './utility/service/http/http.service';
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component'
import { NotFoundComponent } from './utility/notFound/404.component'
import { HeaderComponent } from './utility/header/header.component'
import { FooterComponent } from './utility/footer/footer.component'
import { Carousel } from './index/carousel/carousel.component';
import { Slide } from './index/carousel/slide.component'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { CollectComponent } from './collect/collect.component'
import { ListComponent } from './list/list.component'
import { DetailComponent } from './detail/detail.component'

import { OrderContainerComponent } from './orderConfirm/orderContainer.component'
import { OrderConfirmComponent } from './orderConfirm/children/confirm/orderConfirm.component'
import { PayComponent } from './orderConfirm/children/pay/pay.component'
import { PaySuccessComponent } from './orderConfirm/children/success/paysuccess.component';

import { UserCenterComponent } from './userCenter/userCenter.component'
import { CartComponent } from './cart/cart.component'


@NgModule({
  imports: [BrowserModule, AppRoutingModule, HttpModule, JsonpModule, FormsModule],
  providers: [HttpService],
  declarations: [AppComponent, IndexComponent, NotFoundComponent, HeaderComponent, FooterComponent, Carousel, Slide, LoginComponent, RegisterComponent, CollectComponent, ListComponent, DetailComponent, OrderConfirmComponent, UserCenterComponent, CartComponent, OrderContainerComponent, PayComponent, PaySuccessComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
