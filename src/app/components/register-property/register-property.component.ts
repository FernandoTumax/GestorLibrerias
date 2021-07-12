import { Component, OnInit } from '@angular/core';
import { fadeIn } from '../../transitions/transitions';
import { Libreria } from '../../models/libreria';
import { RestLibreriaService } from '../../services/restLibreria/rest-libreria.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-property',
  templateUrl: './register-property.component.html',
  styleUrls: ['./register-property.component.css'],
  animations: [fadeIn]
})
export class RegisterPropertyComponent implements OnInit {

  public libreria:Libreria;

  constructor(private restLibreria:RestLibreriaService, private router:Router) {
    this.libreria = new Libreria('','','',0,0,'',[],[])
   }

  ngOnInit(): void {
  }

  onSubmit(create:any){
    this.restLibreria.createLibreria(this.libreria).subscribe((res:any) => {
      if(res.libreria){
        Swal.fire({
          icon: 'success',
          title: 'Libreria registrada de forma correcta',
          showConfirmButton: true,
          timer: 5500
        })
        create.reset();
        this.router.navigateByUrl('librerias-property')
      }
    })
  }

}
