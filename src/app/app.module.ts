import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { CarListPageComponent } from './pages/car-list-page/car-list-page.component';
import { CarCardComponent } from './components/car-card/car-card.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AdminNavBarComponent } from './components/nav-bar/admin/admin-nav-bar/admin-nav-bar.component';
import { CreateCarPageComponent } from './pages/create-car-page/create-car-page.component';
import { FooterComponent } from "./components/footer/footer.component";
import { NgxMaskModule } from 'ngx-mask';
import { HttpInterceptorService } from './services/http-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    CarListPageComponent,
    CarCardComponent,
    LoginPageComponent,
    AdminNavBarComponent,
    CreateCarPageComponent,
    FooterComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    NgxMaskModule.forRoot({ showMaskTyped: false }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
     }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
