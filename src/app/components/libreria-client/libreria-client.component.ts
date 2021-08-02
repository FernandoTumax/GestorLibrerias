import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestLibreriaService } from '../../services/restLibreria/rest-libreria.service';
import { fadeIn } from '../../transitions/transitions';

@Component({
  selector: 'app-libreria-client',
  templateUrl: './libreria-client.component.html',
  styleUrls: ['./libreria-client.component.css'],
  animations: [fadeIn]
})
export class LibreriaClientComponent implements OnInit {

  public librerias = [] as any;
  public search:any;
  public hidden:any;
  public imagen:any;
  public message = "Lo sentimos. Por el momento no existen librerias D:"

  constructor(private restLibreria:RestLibreriaService, private router:Router) { }

  ngOnInit(): void {
    this.restLibreria.getLibrerias().subscribe((res:any) => {
      localStorage.setItem('librerias', JSON.stringify(res.librerias))
    })
    this.librerias = JSON.parse(localStorage.getItem('librerias')!)
    if(this.librerias.length === 0){
      this.hidden = true;
    }else{
      this.hidden = false;
    }

    const selectImg = document.getElementsByTagName('img')[1];
    this.librerias.forEach((elemento:any) => {
      if(elemento.img != ""){
        selectImg.removeAttribute('src');
        selectImg.setAttribute('src', elemento.img)
      }
    })

  }

  showLibreria(libreria:any){
    this.restLibreria.getOneLibreria(libreria._id).subscribe((res:any) => {
      localStorage.setItem('libreria', JSON.stringify(res.libreria))
      localStorage.removeItem('librerias')
      this.router.navigateByUrl('libreria')
    })
  }

}
