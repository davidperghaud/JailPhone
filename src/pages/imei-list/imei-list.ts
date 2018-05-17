import { ImeiListProvider } from './../../providers/imei-list/imei-list';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//callNumber & SMS Plugin
import { CallNumber } from '@ionic-native/call-number';
import { SMS } from '@ionic-native/sms';

/**
 * Generated class for the ImeiListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-imei-list',
  templateUrl: 'imei-list.html',
})
export class ImeiListPage {
  imei$: Observable<any>;
  imeis: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public provider: ImeiListProvider,
    private callNumber: CallNumber,
    private sms: SMS) {
    
    this.imeis = navParams.get('imei');
    this.imei$ = provider.getAllPhone_2(this.imeis);
  }

  ionViewDidLoad() {
    console.log(this.imei$);
  }

  call(imei){
    this.callNumber.callNumber(imei.ownerPhone, false)
    .then(()=>console.log('lancement de l\'appel'))
    .catch(()=>console.log('Erreur lancement appel'));
  }

  smsNumber(imei){
     this.sms.send(imei.ownerPhone, 'Je sais où trouver votre téléphone perdu!');
   }

}
