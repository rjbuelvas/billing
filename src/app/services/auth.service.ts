import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

const headers = new HttpHeaders({
  Authorization: environment.token
});

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  postLogin(data) {
    return this.http.post(`${environment.baseUrl}/api/auth`, data, {headers})
      .subscribe(resp => {
      console.log(resp);
    });
  }
}
