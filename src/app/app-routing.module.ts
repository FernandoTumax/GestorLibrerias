import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeClientComponent } from './components/home-client/home-client.component';
import { UserComponent } from './components/user/user.component';
import { PieChartReportComponent } from './components/pie-chart-report/pie-chart-report.component';
import { HomePropertyComponent } from './components/home-property/home-property.component';
import { LibreriasPropertyComponent } from './components/librerias-property/librerias-property.component';
import { RegisterPropertyComponent } from './components/register-property/register-property.component';
import { LibreriaComponent } from './components/libreria/libreria.component';
import { ProductsPropertyComponent } from './components/products-property/products-property.component';
import { RegisterProductComponent } from './components/register-product/register-product.component';
import { ProductComponent } from './components/product/product.component';
import { LibreriaClientComponent } from './components/libreria-client/libreria-client.component';
import {ShoppingCarComponent} from './components/shopping-car/shopping-car.component';
import { ChartsModule } from 'ng2-charts'

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home-client', component: HomeClientComponent},
  {path: 'user', component: UserComponent},
  {path: 'home-property', component: HomePropertyComponent},
  {path: 'librerias-property', component: LibreriasPropertyComponent},
  {path: 'register-property', component: RegisterPropertyComponent},
  {path: 'libreria', component: LibreriaComponent},
  {path: 'products-property', component: ProductsPropertyComponent},
  {path: 'register-product', component: RegisterProductComponent},
  {path: 'product', component: ProductComponent},
  {path: 'pie', component: PieChartReportComponent},
  {path: 'librerias-client', component: LibreriaClientComponent},
  {path: 'shoppingCar', component: ShoppingCarComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ChartsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
