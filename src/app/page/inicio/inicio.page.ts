import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import {AuthService} from '../../services/auth.service';
import {ActionSheetController, IonModal } from '@ionic/angular';
import {AlertController, NavController} from '@ionic/angular';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  invoices = [];
  urlDownload = 'https://api.planetalab.xyz/api/dowload/900782726/FES-SEPT';
  isModalOpen = false;
  user: any;
  urlAvatar: string;
  textSearch: string = '';

  constructor(private invoiceService: InvoiceService, private auth: AuthService,public actionSheetController: ActionSheetController,
              private alert: AlertController) { }
  ngOnInit() {
    this.auth.showLoading('Cargando Facturas');
    this.siguiente();
    this.user = this.auth.usuario;
    this.avatar();
    console.log(this.user);
  }
  async validate(){
    await this.auth.validateToken();
  }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Perfil',
        role: 'perfile',
        icon: 'person-circle-outline',
        id: 'open-modal',
        data: {
          type: 'person'
        },
        handler: () => {
          this.setOpen(true);
        }
        },{
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
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  async logout(){
    await this.auth.showLoading('Cerrando sesión');
    await this.auth.logout();
  }

  event(even) {
    this.presentActionSheet();
  }

  dowloadFile(num: number) {
    window.open(`https://api.planetalab.xyz/api/invoice/900782726/FES-SETP${num}.pdf`);
  }
  dowloadXml(num: number) {
    window.open(`https://api.planetalab.xyz/api/invoice/900782726/FES-SETP${num}.xml`);
  }

  sendEmail(num: number){
    const data = {
      'company_idnumber': 900782726,
      'prefix': 'SETP',
      'number': num
    };
    this.invoiceService.postEmail(data).subscribe( (resp: any) => {
      console.log(resp);
    });
  }

  async siguiente( event ?) {
    await this.invoiceService.getInvoices().subscribe( async (resp: any ) => {
      await this.auth.closeLoading();
      this.invoices = resp.data;
        if( event ){
          await event.target.complete();
          if(resp.data.length === 0){
            event.target.disable = true;
          }
        }
    });
  }

  async recargar( event? ) {
    await this.invoiceService.getInvoices().subscribe( async ( resp: any ) => {
      await this.auth.closeLoading();
      this.invoices = resp.data;
      if( event ){
        await setTimeout(async () => {
          await event.target.complete();
        }, 2000);
      }
    });
  }

  async presentAlert(text?: string) {
    const alert = await this.alert.create({
      backdropDismiss: true,
      message: (text.length > 0 )?text:'reload success',
      buttons: ['OK'],
    });

    await alert.present();
  }

  private avatar() {
    if(this.user.photo === null ){
      this.urlAvatar = `https://planetalab.xyz/assets/img/user.png`;
    }else{
      this.urlAvatar = `https://planetalab.xyz/assets/upload/images/${this.user.photo}`;
    }
  }

  search(event) {
    this.textSearch = event;
  }
}
