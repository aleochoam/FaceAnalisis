import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GaussSimplePage } from './gauss-simple/gauss-simple';
import { GaussPivParcialPage } from './gauss-piv-parcial/gauss-piv-parcial';
import { GaussPivTotalPage } from './gauss-piv-total/gauss-piv-total';
import { FactorizacionSimplePage } from './factorizacion-simple/factorizacion-simple';
import { FactorizacionParcialPage } from './factorizacion-parcial/factorizacion-parcial';
import { CroutPage } from './crout/crout';
import { DoolittlePage } from './doolittle/doolittle';
import { CholeskyPage } from './cholesky/cholesky';


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

  public goGaussPivotal(){
    this.navCtrl.push(GaussPivTotalPage);
  }

  public goFactSimple(){
    this.navCtrl.push(FactorizacionSimplePage);
  }

  public goFactParcial(){
    this.navCtrl.push(FactorizacionParcialPage);
  }

  public goCrout(){
    this.navCtrl.push(CroutPage);
  }

  public goDoolittle(){
    this.navCtrl.push(DoolittlePage);
  }

  public goCholesky(){
    this.navCtrl.push(CholeskyPage);
  }




  ionViewDidLoad() {
    console.log('ionViewDidLoad SistemasDeEcuacionesLinealesPage');
  }

}
