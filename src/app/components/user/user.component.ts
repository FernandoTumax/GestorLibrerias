import { Component, OnInit, DoCheck } from '@angular/core';
import { fadeIn } from '../../transitions/transitions';
import { User } from '../../models/user';
import { RestUserService } from '../../services/restUser/rest-user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CONNECTION } from '../../services/global';
import { HttpHeaders } from '@angular/common/http'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  animations: [fadeIn]
})
export class UserComponent implements OnInit {

  public user:User;
  public selected:any;
  public token:any;
  public uri:any;
  public userLogg:any;
  public userBack:any;
  public imagenUsuario:any;
  public imagenSeleccionada:any;
  public imageBuffer:any;
  public headersImg = {} as any;

  constructor(private restUser:RestUserService, private router:Router, private activatedRote: ActivatedRoute) {
    this.user = this.restUser.getUser();
    this.token = this.restUser.getToken();
    console.log(this.token)
    this.uri = CONNECTION.URI;
   }


  ngOnInit(): void {
    this.userLogg = JSON.parse(localStorage.getItem('usuario')!);
    this.token = localStorage.getItem('token');
    this.restUser.getOneUser(this.userLogg._id).subscribe((res:any) => {
      delete res.usuarios.password;
      this.userBack = res.usuarios;
      this.imagenUsuario = JSON.stringify(this.userBack.img);
      console.log(this.userBack.img);
      const selecImg = document.getElementsByTagName('img')[1];
      if(this.userBack.img != ""){
        selecImg.removeAttribute('src');
        selecImg.setAttribute('src', this.userBack.img)
      }
    })
  }

  updateUser(){
    this.restUser.updateUser(this.user, this.userLogg._id).subscribe((res:any) => {
      delete res.usuario.password;
      localStorage.setItem('usuario', JSON.stringify(res.usuario));
      Swal.fire({
        icon: 'success',
        title: 'Usuario modificado de forma exitosa!!!',
        showConfirmButton:  true,
        timer:  5500
      })
      window.location.reload();
    })
  }

  deleteUser(){
    Swal.fire({
      title: '¿Estás seguro/a de querer eliminar esta cuenta?',
      showDenyButton: true,
      confirmButtonText: `Eliminar`,
      denyButtonText: `No Eliminar`
    }).then((result) => {
      if(result.isConfirmed){
        this.restUser.deleteUser(this.userLogg._id).subscribe((res:any) => {
          if(res.usuario){
            Swal.fire({
              icon: 'success',
              title: `Cuenta del usuario ${res.usuario.username} ha sido eliminado`,
              showConfirmButton: true,
              timer: 5500
            })
            this.router.navigateByUrl('home')
            localStorage.clear()
          }
        })
      }else if(result.isDenied){
        Swal.fire({
          icon: 'info',
          title: 'La cuenta no fue eliminada',
          showCloseButton: true,
          timer: 5500
        })
      }
    })
  }

  subirFoto(){
    this.imagenSeleccionada.arrayBuffer().then((buff:any) => {
      this.imageBuffer = new Uint8Array(buff)
      this.restUser.uploadImg(this.userLogg._id,this.imagenSeleccionada, this.imageBuffer).subscribe((res:any) => {
        Swal.fire({
          icon: 'success',
          title: `La imagen para la cuenta ${res.user.username} ha sido actualizada`,
          showConfirmButton: true,
          timer: 5500
        })
        window.location.reload();
      })
    })
  }

  seleccionarFoto(event:any){
    this.imagenSeleccionada = event.target.files[0];
    console.log(this.imagenSeleccionada)
  }

}
