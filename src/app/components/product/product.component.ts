import { Component, OnInit } from '@angular/core';
import { fadeIn } from '../../transitions/transitions';
import { Product } from '../../models/product';
import { RestUserService } from '../../services/restUser/rest-user.service';
import { RestProductService } from '../../services/restProduct/rest-product.service'
import { RestLibreriaService } from '../../services/restLibreria/rest-libreria.service'
import { Router } from '@angular/router'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  animations: [fadeIn]
})
export class ProductComponent implements OnInit {

  public product:Product;
  public user:any;
  public uri:any;
  public productLocal:any;
  public productBack:any;
  public imagenSeleccionada:any;
  public imageBuffer:any;


  constructor(private restProduct:RestProductService, private router:Router, private restLibreria:RestLibreriaService, private restUser:RestUserService) {
    this.product = this.restProduct.getProduct();
    this.user = this.restUser.getUser();
  }


  ngOnInit(): void {
    let producto = this.restProduct.getProduct()
    this.restProduct.getOneProduct(producto._id).subscribe((res:any) => {
      localStorage.setItem('producto', JSON.stringify(res.product));
      this.productBack = res.product;
      const selectImg = document.getElementsByTagName('img')[1];
      if(this.productBack.img != ""){
        selectImg.removeAttribute('src');
        selectImg.setAttribute('src', this.productBack.img)
      }
    })
    this.productLocal = this.restProduct.getProduct();
  }

  agregarCarrito(){
    let user = this.restUser.getUser();
    let shopping = user.shoppingCar;
    console.log(shopping);
    this.restUser.shoppingCar(this.productLocal).subscribe((res:any) => {
      Swal.fire({
        icon: 'success',
        title: 'Producto añadido al carrito',
        showConfirmButton: true,
        timer: 20000
      })
      localStorage.setItem('usuario', JSON.stringify(res.usuario))
      this.router.navigateByUrl('libreria')
    })
  }

  updateProduct(){
    this.restProduct.updateProduct(this.productLocal._id, this.product).subscribe((res:any) => {
      localStorage.setItem('producto', JSON.stringify(res.product));
      Swal.fire({
        icon: 'success',
        title: 'Producto modificado de forma exitosa!!!',
        showConfirmButton: true,
        timer: 5500
      })
      window.location.reload();
    })
  }

  seleccionarFoto(event:any){
    this.imagenSeleccionada = event.target.files[0];
    console.log(this.imagenSeleccionada);
  }

  subirFoto(){
    this.imagenSeleccionada.arrayBuffer().then((buff:any) => {
      this.imageBuffer = new Uint8Array(buff);
      this.restProduct.uploadImg(this.productLocal._id, this.imagenSeleccionada, this.imageBuffer).subscribe((res:any) => {
        Swal.fire({
          icon: 'success',
          title: `La imagen para el producto ${this.productLocal.name} ha sido actualizada`,
          showConfirmButton: true,
          timer: 5500
        })
        window.location.reload();
      })
    })
  }

  deleteProduct(){
    let libreria = this.restLibreria.getLibreria();
    Swal.fire({
      title: '¿Estás seguro/a de querer eliminar este producto?',
      showDenyButton:  true,
      confirmButtonText: "Eliminar",
      denyButtonText: "No eliminar"
    }).then((result) => {
      if(result.isConfirmed){
        this.restProduct.deleteProduct(this.productLocal._id, libreria._id).subscribe((res:any) => {
          if(res.product){
            Swal.fire({
              icon: 'success',
              title: `El producto con nombre ${res.product.name} ha sido elminado`,
              showConfirmButton: true,
              timer: 5500
            })
            this.router.navigateByUrl('libreria')
            localStorage.removeItem('producto')
          }
        })
      }else if(result.isDenied){
        Swal.fire({
          icon: 'info',
          title: 'El producto no fue eliminado',
          showCloseButton: true,
          timer: 5500
        })
      }
    })
  }

}
