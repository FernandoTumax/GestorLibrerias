import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RestUserService } from '../../services/restUser/rest-user.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let token = this.restUser.getToken();
    if(token != null || token != undefined){
      return true;
    }else{
      let token = this.restUser.getToken();
      if(token && token.length > 0){
        this.router.navigateByUrl('home');
        return false;
      }else{
        this.router.navigateByUrl('home');
        return false;
      }
    }
  }

  constructor(private restUser:RestUserService, private router:Router){}

}
