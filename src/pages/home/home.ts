import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';
import { FoundPage } from './../found/found';
import { DeletePage } from './../delete/delete';
import { RegisterPage } from './../register/register';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/**
 * HomePage functions
 *
 * All Modules which are used in the Home Page
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private admobFree:AdMobFree) {

  }
  ionViewDidLoad() {
    const bannerConfig: AdMobFreeBannerConfig = {
      // add your config here
      // for the sake of this example we will just use the test config
      id: 'ca-app-pub-7157151787023417/4859831599',
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

  //Go To the Register Page
  register(){
    this.navCtrl.push(RegisterPage);
  }

  //Go to the Found Page
  check(){
    this.navCtrl.push(FoundPage);
  }

  //Go to the Delete Page
  remove(){
    this.navCtrl.push(DeletePage);
  }

}
