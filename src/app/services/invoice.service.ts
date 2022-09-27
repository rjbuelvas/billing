import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';



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
  getDownloadFile(num: number){
    return this.http.get(`https://api.planetalab.xyz/api/dowload/900782726/FES-SEPT${num}.pdf`,{responseType: 'blob'});
  }
}
