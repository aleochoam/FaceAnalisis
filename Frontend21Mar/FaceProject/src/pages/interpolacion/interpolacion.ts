import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InterpolacionSistemasDeEcPage } from './interpolacion-sistemas-de-ec/interpolacion-sistemas-de-ec';

/**
 * Generated class for the InterpolacionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-interpolacion',
  templateUrl: 'interpolacion.html',
})
export class InterpolacionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InterpolacionPage');
  }

  public goSisEcuaciones(){
    
    this.navCtrl.push(InterpolacionSistemasDeEcPage);

  }

}
