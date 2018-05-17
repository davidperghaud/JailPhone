import { HomePage } from './../home/home';
import { ImeiListProvider } from './../../providers/imei-list/imei-list';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import * as EmailValidator from 'email-validator';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  a_number: number;
  an_imei: number;
  imei: string;
  brand: string;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
    public provider: ImeiListProvider, public alertCtrl: AlertController) {
    
  }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }


  register() {
    this.a_number = Number(this.ownerPhone);
    this.an_imei = Number(this.imei);
    if (this.imei.length >= 15 && this.imei.length<=17 && this.ownerPhone.length == 9 && (this.ownerPhone[0] == '6' || this.ownerPhone[0] == '2') && this.a_number*0 == 0 && this.an_imei*0 == 0 && EmailValidator.validate(this.ownerEmail)  ) {
      this.provider.createPhone(this.imei,this.brand,this.ownerName,this.ownerEmail,this.ownerPhone);
      this.navCtrl.push(HomePage);
    } else {
      let alert = this.alertCtrl.create({
        title: 'Registration Error',
        subTitle: 'Paramètres saisis incorrects!',
        buttons: ['OK']
      });
      alert.present();
      console.log(EmailValidator.validate(this.ownerEmail));
    }
    
  }

}
