import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RestUserService } from '../../services/restUser/rest-user.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedOutGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let token = this.restUser.getToken();
    if(token == null || token == undefined){
      return true;
    }else{
      let user = this.restUser.getUser();
      if(user.role == 'Cliente'){
        this.router.navigateByUrl('home-client')
      }else if(user.role == 'Propietario'){
        this.router.navigateByUrl('home-property')
      }
      return false;
    }
  }

  constructor(private restUser:RestUserService, private router:Router){}

}
