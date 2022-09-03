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

  token = null;
  constructor(private auth: AuthService, private alert: AlertController, private navCtrl: NavController) {}

  ngOnInit(): void {}

  login( fLogin: NgForm) {
    console.log( fLogin.valid);
    console.log(this.loginUser);
    if(fLogin.valid){
      this.auth.postLogin(this.loginUser).subscribe( async (resp: any) => {
        console.log(resp);
        if(resp.status === 200){
          await this.saveToken(resp.data.token).then(()=>{
            this.navCtrl.navigateRoot('/inicio', {animated: true});
          });
        }else{
          this.token = null;
          localStorage.clear();
          this.presentAlert();
        }
      });
    }
  }

  async saveToken(token){
    this.token = token;
    await localStorage.setItem('token', token);
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
