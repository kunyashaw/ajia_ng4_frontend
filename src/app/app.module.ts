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


@NgModule({
  imports: [BrowserModule, AppRoutingModule, HttpModule, JsonpModule, FormsModule],
  providers: [HttpService],
  declarations: [AppComponent, IndexComponent, NotFoundComponent, HeaderComponent, FooterComponent, Carousel, Slide, LoginComponent, RegisterComponent, CollectComponent, ListComponent, DetailComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
