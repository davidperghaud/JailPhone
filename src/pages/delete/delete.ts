import { ImeiListProvider } from './../../providers/imei-list/imei-list';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DeletePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-delete',
  templateUrl: 'delete.html',
})
export class DeletePage {

  id: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public provider:ImeiListProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeletePage');
  }

  delete(){
    this.provider.deletePhone(this.id); 
  }

}
