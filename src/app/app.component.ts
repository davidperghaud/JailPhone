import { HomePage } from './../pages/home/home';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//Pages
import { TutorialPage } from './../pages/tutorial/tutorial';
//import { ImeiListPage } from "../pages/imei-list/imei-list";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public storage:Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      //To show the Tutorial Page only after the installation of the Page
      this.storage.get('introShown').then((result) => {
        console.log(result);
        if (result) {
          this.rootPage = HomePage;
        } else {
          this.rootPage = TutorialPage;
          this.storage.set('introShown', true);
        }
      });


      statusBar.backgroundColorByHexString("bf0000");//Change the color of the status Bar
      splashScreen.hide(); //hidding the SplashScreen
    });
  }
}

