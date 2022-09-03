import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {NavController} from '@ionic/angular';

const headers = new HttpHeaders({
  Authorization: `Bearer ${environment.token}`
});

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usuario = {};
  constructor(private http: HttpClient, private navCrtl: NavController) {}

  postLogin(data) {
    return this.http.post(`${environment.baseUrl}/api/auth`, data ).pipe(
      catchError((error: HttpErrorResponse) => '0'
      )
    );
  }
  validateToken(): Promise<boolean> {
    if(environment.token == null){
      this.navCrtl.navigateRoot('/home', {animated:true});
      return Promise.resolve(false);
    }
    return new Promise<boolean>( resolve => {
      this.http.post(`${environment.baseUrl}/api/me`,'',{headers})
        .pipe(
          catchError((error: HttpErrorResponse) => 'false'
          )
        )
          .subscribe( (resp: any ) => {
          if(resp.message === 'ok'){
            this.usuario = resp.data;
            resolve(true);
          }else{
            resolve(false);
            this.navCrtl.navigateRoot('/home', {animated:true});
          }
        });
    });
  }
  Logout(){
    localStorage.clear();
    this.usuario = null;
    this.navCrtl.navigateRoot('/home');
  }
}
