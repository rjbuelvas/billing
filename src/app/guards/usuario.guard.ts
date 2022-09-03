import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements CanActivate , CanLoad{
  constructor(private auth: AuthService) {}
  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.validateToken();
  }
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return false;
  }
}
