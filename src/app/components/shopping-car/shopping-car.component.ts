import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Order } from '../../models/order';
import { RestUserService } from '../../services/restUser/rest-user.service';
import { RestProductService } from '../../services/restProduct/rest-product.service';
import { RestOrderService } from '../../services/restOrder/rest-order.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-shopping-car',
  templateUrl: './shopping-car.component.html',
  styleUrls: ['./shopping-car.component.css']
})
export class ShoppingCarComponent implements OnInit {

  public order:Order;
  public products = [] as any;
  public fechaActual:any;
  public message = "No tienes ningun producto en tu carrito";
  public hidden = true;
  public total:number;

  constructor(private restUser:RestUserService, private restProduct:RestProductService, private restOrder:RestOrderService, private router:Router) {
    this.total = 0;
    this.fechaActual = Date.now();
    const hoy = new Date(this.fechaActual)
    this.order = new Order( hoy.toDateString(), 0, [], {_id: "", nameSchoolStore:"", directionSchoolStore: "", NIT:0}, {_id: "", nombreCliente: "", apellidoCliente: "", emailCliente: ""})
   }

  ngOnInit(): void {
    let usuario = this.restUser.getUser();
    let libreria = JSON.parse(localStorage.getItem('libreria')!)
    let clienteFactura = this.order.client;
    let libreriaFactura = this.order.schoolStore;
    clienteFactura._id = usuario._id;
    clienteFactura.nombreCliente = usuario.name;
    clienteFactura.apellidoCliente = usuario.lastname;
    clienteFactura.emailCliente = usuario.email;
    libreriaFactura._id = libreria._id;
    libreriaFactura.nameSchoolStore = libreria.name;
    libreriaFactura.directionSchoolStore = libreria.direction;
    libreriaFactura.NIT = libreria.NIT;
    console.log(this.order);

    this.products = usuario.shoppingCar;
    console.log(this.products)
    if(this.products.length === 0){
      this.hidden = true;
    }else{
      this.hidden = false;
    }
  }

  enviarFactura(){
    this.order.products = this.products;
    this.order.totalAPagar = this.calcularGranTotal();
    this.products.forEach((elemento:any) => {
      elemento.stock = elemento.stock - elemento.cantidad;
      this.restProduct.updateProduct(elemento._id, elemento).subscribe((res:any) => {
      })
    })
    let libreria = JSON.parse(localStorage.getItem('libreria')!);
    let usuario = JSON.parse(localStorage.getItem('usuario')!)
    this.restOrder.createOrder(libreria._id, usuario._id, this.order).subscribe((res:any) => {
      this.restUser.getOneUser(usuario._id).subscribe((res:any) => {
        localStorage.setItem('usuario', JSON.stringify(res.usuarios));
        Swal.fire({
          icon: 'success',
          title: 'Pedido creado con exito',
          showConfirmButton: true
        })
        this.router.navigateByUrl('home-client')
      })
    })
  }

  actualizarCantidad(id:any, event:any):void{
    let cantidad:number = event.target.value as number;
    if(cantidad==0){
      return this.eliminarProducto(id);
    }
    this.products = this.products.map((elemento:any) => {
      if(elemento._id === id){
        elemento.cantidad = cantidad;
      }
      return elemento;
    });
  }

  existeProducto(id:any): boolean{
    let existe = false;
    this.products.forEach((elemento:any) => {
      if(id === elemento._id){
        existe = true;
      }
    });
    return existe;
  }

  incrementaCantidad(id:any): void{

    this.products = this.products.map((elemento:any) => {
      if(elemento._id === id){
        ++elemento.cantidad;
      }
      return elemento;
    });
  }

  calcularGranTotal(){
    this.total = 0;
    this.products.forEach((elemento:any) => {
      let precio = elemento.cantidad * elemento.price;
      this.total = this.total + precio;
    })
    return this.total;
  }

  eliminarProducto(id:any):void{
    console.log(id);
    let user = this.restUser.getUser();
    this.products = this.products.filter((elemento:any) => {
      if(id === elemento._id){
        console.log();
        this.restUser.deleteOneShoppingCar(elemento._id, user._id).subscribe((res:any) => {
          localStorage.setItem('usuario', JSON.stringify(res.user))
        })
      }
    })

  }

}
