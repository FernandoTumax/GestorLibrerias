import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONNECTION } from '../global'
import { map, catchError } from 'rxjs/operators'
import { throwError } from 'rxjs'
import Swal from 'sweetalert2'

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RestUserService {
  public uri:string;
  public fileBuffer:any;

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

  public httpOptionsImage = {
    headers: new HttpHeaders({
      'Content-Type': 'image/png',
      'Authorization': 'Bearer ' + this.getToken()
    })
  }

  public user:any;
  public token:any;

  private extractData(res: any){
    let body = res;
    return body || [] || {};
  }
  constructor(private http:HttpClient, private router:Router) {
    this.uri = CONNECTION.URI;
  }

  getUser(){
    let user = JSON.parse(localStorage.getItem('usuario')!);
    if(user != undefined || user != null){
      this.user = user;
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

  register(user:any){
    let params = JSON.stringify(user);
    return this.http.post(this.uri+'usuarios/create', params, this.httpOptions).pipe(map(this.extractData), catchError((error:any) => {
      Swal.fire({
        icon: 'error',
        title: 'Error al registrar el usuario',
        html: `<h3>${error.error.message}</h3>`
      })
      return throwError(error.error.message);
    }))
  }

  login(user:any){
    let params = JSON.stringify(user);
    return this.http.post(this.uri+'usuarios/login', params, this.httpOptions).pipe(map(this.extractData), catchError((error:any) => {
      Swal.fire({
        icon: 'error',
        title: 'Error al logearte con este usuario',
        html: `<h3>${error.error.message}</h3>`
      })
      return throwError(error.error.message);
    }))
  }

  updateUser(user:any, id:any){
    let params = JSON.stringify(user);
    return this.http.put(`${this.uri}usuarios/${id}`, params, this.httpOptionsAuth).pipe(map(this.extractData), catchError((error:any) => {
      Swal.fire({
        icon: 'error',
        title: 'Error al actualizar el usuario',
        html: `<h3>${error.error.message}</h3>`
      })
      return throwError(error.error.message);
    }))
  }

  shoppingCar(product:any){
    let params = JSON.stringify(product)
    return this.http.put(`${this.uri}usuarios/shoppingCar`,params, this.httpOptionsAuth).pipe(map(this.extractData), catchError((error:any) => {
      Swal.fire({
        icon: 'error',
        title: 'Error al agregar a tu carrito',
        text: error.error.message
      })
      return throwError(error.error.message);
    }))
  }

  deleteUser(id:any){
    return this.http.delete(`${this.uri}usuarios/${id}`, this.httpOptionsAuth).pipe(map(this.extractData), catchError((error:any) => {
      Swal.fire({
        icon: 'error',
        title: 'Error al eliminar el usuario',
        html: `<h3>${error.error.message}</h3>`
      })
      return throwError(error.error.message);
    }))
  }

  getUsers(){
    return this.http.get(this.uri+'usuarios/', this.httpOptionsAuth).pipe(map(this.extractData), catchError((error:any) => {
      Swal.fire({
        icon: 'error',
        title: 'Error al buscar los usuarios',
        text: error.error.message
      })
      return throwError(error)
    }))
  }


  uploadImg(id:any, file:any, fileBuffer:any){
    let config = {
      headers: new HttpHeaders({
        'Content-Type': file.type,
        'Authorization': 'Bearer ' + this.getToken()
      })
    }
    return this.http.put(`${this.uri}usuarios/${id}/image`, fileBuffer, config).pipe(map(this.extractData), catchError((error:any) => {
      Swal.fire({
        icon: 'error',
        title: 'Error al subir una imagen',
        text: error.error.message
      })
      return throwError(error)
    }))
  }



  getOneUser(id:any){
    return this.http.get(`${this.uri}usuarios/oneUser/${id}`, this.httpOptionsAuth).pipe(map(this.extractData), catchError((error:any) => {
      this.router.navigateByUrl('/register')
      console.log(error.error.message.join('<br>'))
      Swal.fire({
        icon: 'error',
        title: 'Error al Buscar un usuario',
        text: error.error.message
      })
      return throwError(error);
    }))
  }

  /*uploadImg(id:any, img:File): Observable<User>{
    let formData = new FormData();
    formData.append("archivo", img);
    return this.http.put(`${this.uri}usuarios/${id}/image`, formData, this.httpOptionsImage).pipe(map(this.extractData), catchError((error:any) => {
      Swal.fire({
        icon: 'error',
        title: 'Error al subir una imagen',
        text: error.error.message
      })
      return throwError(error)
    }))
  }*/

  /*uploadImg(id:any, params: Array<string>, files: Array<File>, token:any, name:any){
    return new Promise((resolve, reject) => {
      let formData:any = new FormData();
      let xhr = new XMLHttpRequest();
      let uri = `${this.uri}usuarios/${id}/image`;

      for(let i=0; i<files.length; i++){
        formData.append(name, files[i], files[i].name);
      }

      xhr.onreadystatechange = () => {
        if(xhr.readyState == 4){
          if(xhr.status == 200){
            resolve(JSON.parse(xhr.response))
          }else{
            reject(xhr.response)
          }
        }
      }
      xhr.open('PUT', uri, true);
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      xhr.send(formData)
    })
  }*/


}
