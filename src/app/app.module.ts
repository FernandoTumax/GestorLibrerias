import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SpinnerModule } from './components/spinner/spinner.module';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { SpinnerInterceptor } from './interceptors/spinner.interceptor';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeClientComponent } from './components/home-client/home-client.component';
import { UserComponent } from './components/user/user.component';
import { HomePropertyComponent } from './components/home-property/home-property.component';
import { LibreriasPropertyComponent } from './components/librerias-property/librerias-property.component';
import { RegisterPropertyComponent } from './components/register-property/register-property.component';
import { LibreriaComponent } from './components/libreria/libreria.component';
import { ProductsPropertyComponent } from './components/products-property/products-property.component';
import { RegisterProductComponent } from './components/register-product/register-product.component';
import { ProductComponent } from './components/product/product.component';
import { LibreriaClientComponent } from './components/libreria-client/libreria-client.component';
import { ShoppingCarComponent } from './components/shopping-car/shopping-car.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    HomeClientComponent,
    UserComponent,
    HomePropertyComponent,
    LibreriasPropertyComponent,
    RegisterPropertyComponent,
    LibreriaComponent,
    ProductsPropertyComponent,
    RegisterProductComponent,
    ProductComponent,
    LibreriaClientComponent,
    ShoppingCarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SpinnerModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
