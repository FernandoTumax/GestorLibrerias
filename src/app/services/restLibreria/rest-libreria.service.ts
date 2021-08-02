import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONNECTION } from '../global';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class RestLibreriaService {

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

  public user:any;
  public libreria:any;
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
      this.user = user;
    }else{
      this.user = null;
    }
    return this.user;
  }

  getLibreria(){
    let libreria = JSON.parse(localStorage.getItem('libreria')!);
    if(libreria != undefined || libreria != null){
      this.libreria = libreria;
    }else{
      this.libreria = null;
    }
    return this.libreria;
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

  getLibrerias(){
    return this.http.get(`${this.uri}librerias/`, this.httpOptionsAuth).pipe(map(this.extractData), catchError((error:any) => {
      Swal.fire({
        icon: 'error',
        title: 'Error al buscar todas librerias',
        html: `<h3>${error.error.message}</h3>`
      })
      return throwError(error.error.message)
    }))
  }

  getOneLibreria(id:any){
    return this.http.get(`${this.uri}librerias/oneSchoolStore/${id}`, this.httpOptionsAuth).pipe(map(this.extractData), catchError((error:any) => {
      Swal.fire({
        icon: 'error',
        title: 'Error al buscar una libreria',
        html: `<h3>${error.error.message}</h3>`
      })
      return throwError(error.error.message)
    }))
  }

  createLibreria(libreria:any){
    let params = JSON.stringify(libreria)
    return this.http.post(`${this.uri}librerias/create`, params, this.httpOptionsAuth).pipe(map(this.extractData), catchError((error:any) => {
      Swal.fire({
        icon: 'error',
        title: 'Error al registrar una libreria',
        html: `<h3>${error.error.message}</h3>`
      })
      return throwError(error.error.message);
    }))
  }

  updateLibreria(id:any, libreria:any){
    let params = JSON.stringify(libreria);
    return this.http.put(`${this.uri}librerias/${id}`, params, this.httpOptionsAuth).pipe(map(this.extractData), catchError((error:any) => {
      Swal.fire({
        icon: 'error',
        title: 'Error al actualizar una libreria',
        html: `<h3>${error.error.message}</h3>`
      })
      return throwError(error.error.message);
    }))
  }

  uploadImg(id:any, file:any, fileBuffer:any){
    let config = {
      headers: new HttpHeaders({
        'Content-Type': file.type,
        'Authorization': 'Bearer ' + this.getToken()
      })
    }
    console.log(fileBuffer);
    return this.http.put(`${this.uri}librerias/${id}/image`, file, config).pipe(map(this.extractData), catchError((error:any) => {
      Swal.fire({
        icon: 'error',
        title: 'Error al subir la imagen de la libreria',
        html: `<h3>${error.error.message}</h3>`
      })
      return throwError(error.error.message);
    }))
  }

  deleteLibreria(id:any){
    return this.http.delete(`${this.uri}librerias/${id}`, this.httpOptionsAuth).pipe(map(this.extractData), catchError((error:any) => {
      Swal.fire({
        icon: 'error',
        title: 'Error al eliminar una libreria',
        html: `<h3>${error.error.message}</h3>`
      })
      return throwError(error.error.message);
    }))
  }

}
