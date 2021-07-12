import { Component, OnInit } from '@angular/core';
import { RestUserService } from '../../services/restUser/rest-user.service';

@Component({
  selector: 'app-shopping-car',
  templateUrl: './shopping-car.component.html',
  styleUrls: ['./shopping-car.component.css']
})
export class ShoppingCarComponent implements OnInit {

  public products = [] as any;
  public message = "No tienes ningun producto en tu carrito";
  public hidden = true;

  constructor(private restUser:RestUserService) { }

  ngOnInit(): void {
    let usuario = this.restUser.getUser();
    this.products = usuario.shoppingCar;
    if(this.products.length === 0){
      this.hidden = true;
    }else{
      this.hidden = false;
    }
  }

}
