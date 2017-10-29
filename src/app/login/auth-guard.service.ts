import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth-service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AngularFireAuth, private router: Router, private authService:AuthService) {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    let url = state.url;
    console.log("url:"+url);
    return this.checkLogin(url);
    
  }
    checkLogin(url){
      return this.auth.authState
      .take(1)
      .map((authState) => !!authState)
      .do(authenticated => {
        (!authenticated)? (this.router.navigate(['/login']),this.authService.redirectUrl = url):true;
      });
  }
}

