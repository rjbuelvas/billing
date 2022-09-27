import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {NavController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usuario = {};
  private token =localStorage.getItem('token');
  constructor(private http: HttpClient, private navCrtl: NavController) {}

  postLogin(data) {
    return this.http.post(`${environment.baseUrl}/api/auth`, data ).pipe(
      catchError((error: HttpErrorResponse) => '0'
      )
    );
  }
  async validateToken(): Promise<boolean> {
    if(localStorage.getItem('token') == null){
      await this.navCrtl.navigateRoot('/home', {animated:true});
      return Promise.resolve(false);
    }
    return new Promise<boolean>( async resolve => {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`
      });
      await this.http.post(`${environment.baseUrl}/api/me`,'',{headers})
        .pipe(
          catchError((error: HttpErrorResponse) => 'false'
          )
        )
          .subscribe( (resp: any ) => {
          if(resp.message === 'ok'){
            this.usuario = resp.data;
            resolve(true);
          }else{
            this.navCrtl.navigateRoot('/home', {animated:true});
            resolve(false);
          }
        });
    });
  }
  async saveToken(token){
    this.token = token;
    await localStorage.setItem('token', token);
    await this.validateToken();
  }
  Logout(){
    localStorage.clear();
    this.usuario = null;
    this.token = null;
    this.navCrtl.navigateRoot('/home');
  }
}
