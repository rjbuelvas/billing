import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import {AuthService} from '../../services/auth.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(private invoiceService: InvoiceService, private auth: AuthService) { }

  ngOnInit() {
    this.invoiceService.getInvoices();
  }

  logout(  event ){
    this.auth.Logout();
  }

}
