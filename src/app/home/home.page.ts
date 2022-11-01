import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {AlertController, NavController} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  loginUser = {
    username: '',
    password: ''
  };
  mail = '';
  isModalOpen = false;
  frecovery: NgForm;
  constructor(private auth: AuthService, private alert: AlertController, private navCtrl: NavController) {}

  ngOnInit(): void {
  }

  async login( fLogin: NgForm) {
    await this.auth.showLoading('Valindado Información');
    if(fLogin.valid){
      await this.auth.postLogin(this.loginUser).subscribe( async (resp: any) => {
        await this.auth.closeLoading();
        if(resp.status === 200){
          await this.auth.saveToken(resp.data.token);
          this.navCtrl.navigateRoot('/inicio', {animated: true});
        }else{
          localStorage.clear();
          this.presentAlert();
        }
      });
    }
  }

  async presentAlert(text?: string) {
    const alert = await this.alert.create({
      backdropDismiss: false,
      header: 'Error',
      subHeader: 'Error al autenticar',
      message: 'Por favor valide la informacion',
      buttons: ['OK'],
    });

    await alert.present();
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
    if(!isOpen){
      this.mail = '';
    }
  }

  async recovery(frecovery: NgForm) {
    await this.auth.showLoading('Recuperando contraseña');
    if (frecovery.valid) {
      await this.auth.recovery(this.mail).subscribe( async (resp: any ) => {
        await  this.auth.closeLoading();
        console.log(resp);
        this.presentAlertRecovery(resp.data.message);
        this.setOpen(false);
      });
    }
  }

  async presentAlertRecovery(text?: string) {
    const alert = await this.alert.create({
      backdropDismiss: true,
      message: (text.length > 0 )?text:'',
      buttons: ['OK'],
    });

    await alert.present();
  }
}
