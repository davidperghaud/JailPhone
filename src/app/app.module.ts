import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TutorialPage } from './../pages/tutorial/tutorial';
import { Network } from '@ionic-native/network';
import { SMS } from '@ionic-native/sms';
import { RegisterPage } from './../pages/register/register';
import { FoundPage } from './../pages/found/found';
import { DeletePage } from './../pages/delete/delete';

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ImeiListPage } from './../pages/imei-list/imei-list';

//callNumber API
import { CallNumber } from '@ionic-native/call-number';

//graphql Module
import { GraphQLModule } from './graphql.module';
import { ImeiListProvider } from '../providers/imei-list/imei-list';

//AdMbod Modules
import { AdMobFree } from '@ionic-native/admob-free';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ImeiListPage,
    DeletePage,
    FoundPage,
    RegisterPage,
    TutorialPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    GraphQLModule,
    BrowserAnimationsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ImeiListPage,
    FoundPage,
    DeletePage,
    RegisterPage,
    TutorialPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ImeiListProvider,
    CallNumber,
    SMS,
    AdMobFree,
    Network
  ]
})
export class AppModule {}
