import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
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
import {ShoppingCarComponent} from './components/shopping-car/shopping-car.component';
import { PropertyGuard } from './guards/property/property.guard';
import { LoggedOutGuard } from './guards/loggedOut/logged-out.guard';
import { LoggedGuard } from './guards/logged/logged.guard';
import { ClientGuard } from './guards/client/client.guard';
import { ChartsModule } from 'ng2-charts'

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', canActivate:[LoggedOutGuard], component: HomeComponent},
  {path: 'register',canActivate:[LoggedOutGuard],  component: RegisterComponent},
  {path: 'login', canActivate:[LoggedOutGuard], component: LoginComponent},
  {path: 'home-client', canActivate:[ClientGuard], component: HomeClientComponent},
  {path: 'user', canActivate:[LoggedGuard], component: UserComponent},
  {path: 'home-property', canActivate:[PropertyGuard], component: HomePropertyComponent},
  {path: 'librerias-property', canActivate:[PropertyGuard], component: LibreriasPropertyComponent},
  {path: 'register-property', canActivate:[PropertyGuard], component: RegisterPropertyComponent},
  {path: 'libreria', component: LibreriaComponent},
  {path: 'products-property', canActivate:[LoggedGuard], component: ProductsPropertyComponent},
  {path: 'register-product', canActivate:[PropertyGuard], component: RegisterProductComponent},
  {path: 'product', canActivate:[LoggedGuard], component: ProductComponent},
  {path: 'librerias-client', canActivate:[ClientGuard], component: LibreriaClientComponent},
  {path: 'shoppingCar', canActivate:[ClientGuard], component: ShoppingCarComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ChartsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
