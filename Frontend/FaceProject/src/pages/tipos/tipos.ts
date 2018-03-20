import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UnaVariablePage } from '../una-variable/una-variable';

/**
 * Generated class for the TiposPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tipos',
  templateUrl: 'tipos.html',
})
export class TiposPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  onGoToUnaVariable(){
    this.navCtrl.push(UnaVariablePage);
  }

}
