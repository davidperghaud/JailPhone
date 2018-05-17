import { HomePage } from './../home/home';
import { Component, ViewChild, trigger, transition, style, state, animate, keyframes } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides  } from 'ionic-angular';

/**
 * Generated class for the TutorialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
    animations: [
      trigger('bounce', [
        state('*', style({
          transform: 'translateX(0)'
        })),
        transition('*=>rightSwipe', animate('700ms ease-out', keyframes([
          style({ transform: 'translateX(0)', offset: 0 }),
          style({ transform: 'translateX(-65px)', offset: .3 }),
          style({ transform: 'translateX(0)', offset: 1 })
        ]))),
        transition('*=>leftSwipe', animate('700ms ease-out', keyframes([
          style({ transform: 'translateX(0)', offset: 0 }),
          style({ transform: 'translateX(65px)', offset: .3 }),
          style({ transform: 'translateX(0)', offset: 1 })
        ]))),
      ])
    ]
})
export class TutorialPage {
  @ViewChild(Slides) slides: Slides;
  skipMsg: string = "Passer";
  state: string = 'x';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  skip() {
    this.navCtrl.setRoot(HomePage);
  }

  slideChanged() {
    if (this.slides.isEnd()) {
      this.skipMsg = "Ok, J'ai compris!";
    }
  }

  slideMoved() {
    if (this.slides.getActiveIndex() >= this.slides.getPreviousIndex()) {
      this.state = 'rightSwipe';
    }
    else {
      this.state = 'leftSwipe';
    }
  }

  animationDone() {
    this.state = 'x';
  }

}
