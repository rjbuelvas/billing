import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

const headers = new HttpHeaders({
  Authorization: environment.token
});

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient) {  }
  getInvoices() {
    return this.http.get(`${environment.baseUrl}/api/v2/invoices`,{headers})
      .subscribe(resp => {
        console.log(resp);
      });
  }
}
