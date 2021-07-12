import { Component, OnInit } from '@angular/core';
import { RestUserService } from '../../services/restUser/rest-user.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { fadeIn } from '../../transitions/transitions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [fadeIn]
})
export class LoginComponent implements OnInit {

  public user:User;
  public token:any;
  public userLogged:any;

  constructor(private restUser: RestUserService, private router:Router) {
    this.user = new User('','','','','','','',[],[])
   }

  ngOnInit(): void {
  }

  onSubmit(login:any){
    console.log(this.user)
    this.restUser.login(this.user).subscribe((res:any) => {
      console.log(res)
      if(!res.token){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No reconocemos su token para entrar a este sitio',
          footer: '<h1>¿Estas seguro que es tu cuenta?</h1>'
        })
      }else{
        this.userLogged = res.usuario;
        this.token = res.token;
        delete this.userLogged.password;
        if(this.token.length < 0){
          Swal.fire({
            icon: 'error',
            title: 'Token no generado :(',
            text: 'lo sentimos pero tu token no fue generado, intenta probar de nuevo',
            footer: '<h1>¿Sigues sin entrar? comunicate con: fernandotumax11@gmail.com</h1>'
          })
          login.reset();
        }else{
          if(this.userLogged.role === "Cliente"){
            localStorage.setItem('token', this.token)
            localStorage.setItem('usuario', JSON.stringify(this.userLogged))
            this.router.navigateByUrl('home-client');
            Swal.fire({
              icon: 'success',
              title: 'Usuario logeado de forma correcta',
              showConfirmButton: true,
              timer: 5500
            })
          }else if(this.userLogged.role === "Propietario"){
            localStorage.setItem('token', this.token)
            localStorage.setItem('usuario', JSON.stringify(this.userLogged))
            this.router.navigateByUrl('home-property')
            Swal.fire({
              icon: 'success',
              title: 'Usuario logeado de forma correcta',
              showConfirmButton: true,
              timer: 5500
            })
          }


        }
      }
    })
  }

}
