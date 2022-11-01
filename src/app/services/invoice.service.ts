import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError} from "rxjs/operators";



@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient) {  }
  getInvoices() {
    const headers = new HttpHeaders({
      Authorization: localStorage.getItem('token')
    });
    return this.http.get(`${environment.baseUrl}/api/v1/invoices/all`,{headers});
  }
  postEmail(data) {
    const headers = new HttpHeaders({
      Authorization: localStorage.getItem('token'),
    });
    return this.http.post(`${environment.baseUrl}/api/send-email-customer/Now`, data,{headers} );
  }
}
