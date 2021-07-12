import { Component, OnInit } from '@angular/core';
import { fadeIn } from '../../transitions/transitions';
import { Product } from '../../models/product';
import { RestLibreriaService } from '../../services/restLibreria/rest-libreria.service';
import { RestProductService } from '../../services/restProduct/rest-product.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-product',
  templateUrl: './register-product.component.html',
  styleUrls: ['./register-product.component.css'],
  animations: [fadeIn]
})
export class RegisterProductComponent implements OnInit {

  public product:Product;
  public idLibreria:any;

  constructor(private restLibreria:RestLibreriaService, private restProduct:RestProductService, private router:Router) {
    this.product = new Product('','',0,0,'');
  }

  ngOnInit(): void {
    let libreria = JSON.parse(localStorage.getItem('libreria')!)
    this.idLibreria = libreria._id;
    console.log(this.idLibreria)
  }

  onSubmit(create:any){
    this.restProduct.createProduct(this.idLibreria,this.product).subscribe((res:any) => {
      if(res.product){
        Swal.fire({
          icon: 'success',
          title: 'Producto registrado de forma exitosa',
          showConfirmButton: true,
          timer: 5500
        })
        create.reset();
        this.router.navigateByUrl('libreria')
      }
    })
  }


}
