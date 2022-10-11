import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {LoadingController, NavController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usuario = {};
  loading: HTMLIonLoadingElement;
  private token =localStorage.getItem('token');
  constructor(private http: HttpClient, private navCrtl: NavController, private loadingCtrl: LoadingController) {}

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
  async logout(){
    localStorage.clear();
    this.usuario = null;
    this.token = null;
    setTimeout(async () => {
      await this.closeLoading();
      await this.navCrtl.navigateRoot('/home');
    }, 3000);
  }
  async showLoading(text) {
    this.loading = await this.loadingCtrl.create({
      message: `${text}...`,
      spinner: 'circles',
    });
    await this.loading.present();
  }

  async closeLoading(){
    await this.loading.dismiss();
  }
}
