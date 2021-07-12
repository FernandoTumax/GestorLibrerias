import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { RestUserService } from '../../services/restUser/rest-user.service'
import { CONNECTION } from '../../services/global'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {

  title:string = 'Gestor Librerias';
  public uri:any;
  public token:any;
  public user:any;

  constructor(private router:Router, private restUser:RestUserService) { }


  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.user = this.restUser.getUser();
    this.uri = CONNECTION.URI;
  }

  ngDoCheck(){
    this.token = this.restUser.getToken();
    this.user = this.restUser.getUser();
  }

  logOut(){
    localStorage.clear();
    this.router.navigateByUrl('home');
  }


}
