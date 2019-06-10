import { BrowserModule } from '@angular/platform-browser';
import { ClassProvider, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
// import { MainPageComponent } from './main-page/main-page.component';
import { NewsComponent } from './news/news.component';
import { MenuComponent } from './menu/menu.component';
import {FormsModule} from '@angular/forms';
import { ProviderService } from './shared/services/provider.service';
import {HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {AuthInterceptor} from './AuthInterceptor';
import { AboutComponent } from './about/about.component';
import { StocksComponent } from './stocks/stocks.component';
import { TableComponent } from './table/table.component';
import { OrdersComponent } from './orders/orders.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    // MainPageComponent,
    NewsComponent,
    MenuComponent,
    AboutComponent,
    StocksComponent,
    TableComponent,
    OrdersComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],

  providers: [ProviderService,
    <ClassProvider> {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
