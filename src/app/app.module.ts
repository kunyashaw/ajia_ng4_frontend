import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.route'
import { HttpModule, JsonpModule } from '@angular/http'
import { HttpService } from './utility/service/http/http.service';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component'
import { NotFoundComponent } from './utility/notFound/404.component'
import { HeaderComponent } from './utility/header/header.component'
import { FooterComponent } from './utility/footer/footer.component'



@NgModule({
  imports: [BrowserModule, AppRoutingModule, HttpModule, JsonpModule],
  providers: [HttpService],
  declarations: [AppComponent, IndexComponent, NotFoundComponent, HeaderComponent, FooterComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
