import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import {AuthService} from '../../services/auth.service';
import {ActionSheetController} from '@ionic/angular';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(private invoiceService: InvoiceService, private auth: AuthService,public actionSheetController: ActionSheetController) { }

  ngOnInit() {
    this.invoiceService.getInvoices();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Logout',
        role: 'destructive',
        icon: 'exit-outline',
        id: 'delete-button',
        data: {
          type: 'delete'
        },
        handler: () => {
          this.logout();
        }
      }]
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);
  }

  async logout(){
    await this.auth.Logout();
  }

  event(even) {
    this.presentActionSheet();
  }
}
