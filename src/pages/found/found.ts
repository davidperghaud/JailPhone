import { ImeiListPage } from './../imei-list/imei-list';
import { ImeiListProvider } from './../../providers/imei-list/imei-list';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

//AdMob
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';

/**
 * Generated class for the FoundPage page.
 *
 * FoundPage is the module used to check if the phone is declared.
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-found',
  templateUrl: 'found.html',
})
export class FoundPage {
  an_imei: number;
  imei: string;
  imei_2: Observable<any>;
  i: number =0;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private provider: ImeiListProvider,
    public alertCtrl: AlertController,
    private admobFree: AdMobFree) {
  
  }

  ionViewDidLoad() {
     const bannerConfig: AdMobFreeBannerConfig = {
      // add your config here
      // for the sake of this example we will just use the test config
      id:'ca-app-pub-7157151787023417/4859831599',
      isTesting: true,
      autoShow: true
    };
    this.admobFree.banner.config(bannerConfig);

    this.admobFree.banner.prepare()
      .then(() => {
        // banner Ad is ready
        // if we set autoShow to false, then we will need to call the show method here
      })
      .catch(e => console.log(e)); 

  }

  found(imei){
    if (this.i == 0) {
      //Interstitial ads
       let interstitialConfig: AdMobFreeInterstitialConfig = {
        id: 'ca-app-pub-7157151787023417/2500808287',
        isTesting: true,
        autoShow: true
      };
      this.admobFree.interstitial.config(interstitialConfig);
      this.admobFree.interstitial.prepare()
        .then(() => {
          this.i = this.i +1;
        });

    } else {
      this.an_imei = Number(this.imei);
      if (this.imei.length >= 15 && this.imei.length <= 17 && this.an_imei * 0 == 0) {
        this.provider.createPhone_2(this.imei, 'this.brand', 'Pas de Propriétaire', '1', ' 1');
        this.navCtrl.push(ImeiListPage, { imei: imei });
      } else {
        let alert = this.alertCtrl.create({
          title: 'IMEI Incorrect',
          subTitle: 'Rentrez un Imei valide',
          buttons: ['OK']
        });
        alert.present();
      }
    }
    
    
  }

}
