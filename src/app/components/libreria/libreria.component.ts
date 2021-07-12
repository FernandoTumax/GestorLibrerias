import { Component, OnInit } from '@angular/core';
import { fadeIn } from '../../transitions/transitions';
import { Libreria } from '../../models/libreria';
import { RestLibreriaService } from '../../services/restLibreria/rest-libreria.service';
import { RestUserService } from '../../services/restUser/rest-user.service';
import { Router } from '@angular/router'
import Swal from 'sweetalert2'


@Component({
  selector: 'app-libreria',
  templateUrl: './libreria.component.html',
  styleUrls: ['./libreria.component.css'],
  animations: [fadeIn]
})
export class LibreriaComponent implements OnInit {

  public libreria:Libreria;
  public user:any;
  public uri:any;
  public libreriaLocal:any;
  public libreriaBack:any;
  public imagenLibreria:any;

  constructor(private restLibreria:RestLibreriaService, private restUser:RestUserService, private router:Router) {
      this.libreria = this.restLibreria.getLibreria();
      this.user =this.restUser.getUser();
      console.log(this.user);
  }

  ngOnInit(): void {
    let libreria = this.restLibreria.getLibreria();
    this.restLibreria.getOneLibreria(libreria._id).subscribe((res:any) => {
      localStorage.setItem('libreria', JSON.stringify(res.libreria))
      this.libreriaBack = res.libreria;
      this.imagenLibreria = JSON.stringify(this.libreriaBack.img);
      console.log(this.libreriaBack.img)
      const selectImg = document.getElementsByTagName('img')[1];
      if(this.libreriaBack.img === ""){
        console.log("no existe imagen")
      }else{
        console.log(this.imagenLibreria.slice(0))
        selectImg.removeAttribute('src');
        selectImg.setAttribute('src', this.libreriaBack.img)
      }
    })
    this.libreriaLocal = this.restLibreria.getLibreria();
  }

  updateLibreria(){
    this.restLibreria.updateLibreria(this.libreriaLocal._id, this.libreria).subscribe((res:any) => {
      localStorage.setItem('libreria', JSON.stringify(res.libreria));
      Swal.fire({
        icon: 'success',
        title: 'Libreria modificada de forma exitosa!!!',
        showConfirmButton: true,
        timer: 5500
      })
      window.location.reload();
    })
  }

  deleteLibreria(){
    Swal.fire({
      title: '¿Estás seguro/a de querer eliminar esta libreria?',
      showDenyButton: true,
      confirmButtonText: "Eliminar",
      denyButtonText: "No eliminar"
    }).then((result) => {
      if(result.isConfirmed){
        this.restLibreria.deleteLibreria(this.libreriaLocal._id).subscribe((res:any) => {
          if(res.libreria){
            Swal.fire({
              icon: 'success',
              title: `Libreria con nombre ${res.libreria.name} ha sido eliminado`,
              showConfirmButton: true,
              timer: 5500
            })
            this.router.navigateByUrl('librerias-property')
            localStorage.removeItem('libreria')
          }
        })
      }else if(result.isDenied){
        Swal.fire({
          icon: 'info',
          title: 'La libreria no fue eliminada',
          showCloseButton: true,
          timer: 5500
        })
      }
    })
  }

}
