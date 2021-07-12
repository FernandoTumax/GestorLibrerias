import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONNECTION } from '../global';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';

import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class RestProductService {

public uri:string;

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

public product:any;
public token:any;

private extractData(res:any){
  let body = res;
  return body || [] || {};
}

  constructor(private http:HttpClient, private router:Router) {
    this.uri = CONNECTION.URI;
  }

  getProduct(){
    let product = JSON.parse(localStorage.getItem('producto')!)
    if(product != undefined || product != null){
      this.product = product;
    }else{
      this.product = null;
    }

    return this.product
  }

  getToken(){
    let token = localStorage.getItem('token');
    if(token != undefined || token != null){
      this.token = token
    }else{
      this.token = null
    }
    return this.token
  }

  getProducts(){
    return this.http.get(`${this.uri}productos/`, this.httpOptionsAuth).pipe(map(this.extractData), catchError((error:any) => {
      Swal.fire({
        icon: 'error',
        title: 'Error al buscar todos los productos',
        text: error.error.message
      })
      return throwError(error.error.message)
    }))
  }

  getOneProduct(id:any){
    return this.http.get(`${this.uri}productos/${id}`, this.httpOptionsAuth).pipe(map(this.extractData), catchError((error:any) => {
      Swal.fire({
        icon: 'error',
        title: 'Error al buscar un producto',
        text: error.error.message
      })
      return throwError(error.error.message)
    }))
  }

  createProduct(id:any, product:any){
    let params = JSON.stringify(product);
    return this.http.post(`${this.uri}productos/${id}/create`, params, this.httpOptionsAuth).pipe(map(this.extractData), catchError((error:any) => {
      Swal.fire({
        icon: 'error',
        title: 'Error al crear un producto',
        text: error.error.message
      })
      return throwError(error.error.message)
    }))
  }

  updateProduct(id:any, product:any){
    let params = JSON.stringify(product);
    return this.http.put(`${this.uri}productos/${id}`, params, this.httpOptionsAuth).pipe(map(this.extractData), catchError((error:any) => {
      Swal.fire({
        icon: 'error',
        title: 'Error al actualizar el producto',
        text: error.error.message
      })
      return throwError(error.error.message)
    }))
  }

  deleteProduct(idProduct:any, idLibreria:any){
    return this.http.delete(`${this.uri}productos/${idProduct}/${idLibreria}`, this.httpOptionsAuth).pipe(map(this.extractData), catchError((error:any) => {
      Swal.fire({
        icon: 'error',
        title: 'Error al eliminar el producto',
        text: error.error.message
      })
      return throwError(error.error.message)
    }))
  }

}
