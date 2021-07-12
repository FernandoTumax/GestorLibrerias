import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestLibreriaService } from '../../services/restLibreria/rest-libreria.service';
import { RestProductService } from '../../services/restProduct/rest-product.service';
import { RestUserService } from '../../services/restUser/rest-user.service';
import { fadeIn } from '../../transitions/transitions';

@Component({
  selector: 'app-products-property',
  templateUrl: './products-property.component.html',
  styleUrls: ['./products-property.component.css'],
  animations: [fadeIn]
})
export class ProductsPropertyComponent implements OnInit {

  public productos = [] as any;
  public user:any;
  public libreria:any;
  public search:any;
  public hidden:any;
  public message = "No existe ningun producto por favor crear uno :D"

  constructor(private restLibreria:RestLibreriaService, private restProduct:RestProductService, private router:Router, private restUser:RestUserService) {
    this.user = this.restUser.getUser();
  }

  ngOnInit(): void {
    let libreria = this.restLibreria.getLibreria();
    this.restLibreria.getOneLibreria(libreria._id).subscribe((res:any) => {
      localStorage.setItem('libreria', JSON.stringify(res.libreria))
    })
    this.libreria = this.restLibreria.getLibreria();
    if(this.libreria.products.length === 0){
      this.hidden = true;
    }else{
      this.hidden = false;
      this.productos = this.libreria.products;
    }
    console.log(this.hidden)
  }

  showProduct(producto:any){
    this.restProduct.getOneProduct(producto._id).subscribe((res:any) => {
      localStorage.setItem('producto', JSON.stringify(res.product))
      this.router.navigateByUrl('product')
    })
  }

}
