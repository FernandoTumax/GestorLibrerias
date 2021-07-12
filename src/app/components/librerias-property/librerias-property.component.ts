import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestUserService } from '../../services/restUser/rest-user.service';
import { RestLibreriaService } from '../../services/restLibreria/rest-libreria.service'
import { fadeIn } from '../../transitions/transitions';

@Component({
  selector: 'app-librerias-property',
  templateUrl: './librerias-property.component.html',
  styleUrls: ['./librerias-property.component.css'],
  animations: [fadeIn]
})
export class LibreriasPropertyComponent implements OnInit {

  public librerias = [] as any;
  public user:any;
  public libreria:any;
  public search:any;
  public hidden:any;
  public message = "No existe ninguna libreria por favor crea una :D";

  constructor(private restUser:RestUserService, private restLibreria:RestLibreriaService, private router:Router) { }

  ngOnInit(): void {
    let usuario = this.restUser.getUser();
    this.restUser.getOneUser(usuario._id).subscribe((res:any) => {
      localStorage.setItem('usuario', JSON.stringify(res.usuarios))
    })
    this.user = this.restUser.getUser();
    if(this.user.schoolStore.length === 0){
      this.hidden = true;
    }else{
      this.hidden = false;
      this.librerias = this.user.schoolStore;
    }
    console.log(this.hidden);
  }

  showLibreria(libreria:any){
    this.restLibreria.getOneLibreria(libreria._id).subscribe((res:any) => {
      localStorage.setItem('libreria', JSON.stringify(res.libreria))
      this.router.navigateByUrl('libreria')
    })
  }

}
