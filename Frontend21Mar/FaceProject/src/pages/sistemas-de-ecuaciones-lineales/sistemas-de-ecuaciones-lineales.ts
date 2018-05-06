import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GaussSimplePage } from './gauss-simple/gauss-simple';
import { GaussPivParcialPage } from './gauss-piv-parcial/gauss-piv-parcial';


/**
 * Generated class for the SistemasDeEcuacionesLinealesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sistemas-de-ecuaciones-lineales',
  templateUrl: 'sistemas-de-ecuaciones-lineales.html',
})
export class SistemasDeEcuacionesLinealesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  public goGaussSimple(){
    this.navCtrl.push(GaussSimplePage);
  }

  public goGaussPivParcial(){
    this.navCtrl.push(GaussPivParcialPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SistemasDeEcuacionesLinealesPage');
  }

}
