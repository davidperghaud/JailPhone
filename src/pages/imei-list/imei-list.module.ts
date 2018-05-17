import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImeiListPage } from './imei-list';

@NgModule({
  declarations: [
    ImeiListPage,
  ],
  imports: [
    IonicPageModule.forChild(ImeiListPage),
  ],
})
export class ImeiListPageModule {}
