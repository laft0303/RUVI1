import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { RuviService } from '../servicios/ruvi.service';
import { element } from 'protractor';
import { isNull } from 'util';

@Component({

  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  registros: any[] = [];
  errorMessage = '';
public usuario: string;
public contrasena: string;
datos: any;
items: any = [];
  constructor(private router: Router,
              public alertController: AlertController,
              private sendData: RuviService,
              private loadingCtrl: LoadingController, private ruviservice: RuviService, private navCtrl: NavController
              ) { }
  model: any = {};
  ngOnInit() {
    this.model = {
      email : null,
      clave : null
    };
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Por favor diligencie todos los campos para continuar',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentinvalido() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Usuario o contraseña invalido',
      buttons: ['OK']
    });
    this.contrasena = '';
    this.usuario = '';
    await alert.present();
  }

  public async login( forma: NgForm ) {
    if (forma.valid) {
      const loading = await this.loadingCtrl.create({
        message: 'Validando...',
        spinner: 'bubbles'
      });
      loading.present();
      loading.dismiss();
      this.sendData.getLogin(this.usuario, this.contrasena).subscribe(data => {
        console.log(data);
        if ( isNull(data)) {
          this.presentinvalido();
        } else {
        console.log(this.items);
        this.navCtrl.navigateRoot('menu'); }
      });
    } else {
      this.presentAlert();
    }
  }
}
