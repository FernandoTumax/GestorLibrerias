import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONNECTION } from '../global';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router'
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RestOrderService {

  public uri:String;

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  public httpOptionsAuth = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    })
  }

  public user:any;
  public token:any;

  private extractData(res:any){
    let body = res;
    return body || [] || {};
  }

  constructor(private http:HttpClient, private router:Router) {
    this.uri = CONNECTION.URI;
  }

  getUser(){
    let user = JSON.parse(localStorage.getItem('usuario')!);
    if(user != undefined || user != null){
      this.user = user
    }else{
      this.user = null;
    }
    return this.user;
  }

  getToken(){
    let token = localStorage.getItem('token');
    if(token != undefined || token != null){
      this.token = token;
    }else{
      this.token = null;
    }
    return this.token;
  }

  createOrder(idLibreria:any, idUsuario:any, order:any){
    console.log(order)
    let params = JSON.stringify(order);
    console.log(params);
    return this.http.post(`${this.uri}pedidos/create/${idLibreria}/${idUsuario}`, params, this.httpOptionsAuth).pipe(map(this.extractData), catchError((error:any) => {
      Swal.fire({
        icon: 'error',
        title: 'Error al crear el pedido',
        html: `<h3>${error.error.message}</h3>`
      })
      return throwError(error.error.message)
    }))
  }

}
