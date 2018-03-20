import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IncrementalPage } from './incremental/incremental';

/**
 * Generated class for the UnaVariablePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-una-variable',
  templateUrl: 'una-variable.html',
})
export class UnaVariablePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  onGoToIncremental(){
    this.navCtrl.push(IncrementalPage);
  }

}
