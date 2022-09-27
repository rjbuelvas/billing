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

  constructor(private auth: AuthService, private alert: AlertController, private navCtrl: NavController) {}

  ngOnInit(): void {
  }

  async login( fLogin: NgForm) {
    console.log( fLogin.valid);
    console.log(this.loginUser);
    if(fLogin.valid){
      await this.auth.postLogin(this.loginUser).subscribe( async (resp: any) => {
        console.log(resp);
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

  async presentAlert() {
    const alert = await this.alert.create({
      backdropDismiss: false,
      header: 'Error',
      subHeader: 'Error al autenticar',
      message: 'Por favor valide la informacion',
      buttons: ['OK'],
    });

    await alert.present();
  }

}
