import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InterpolacionSistemasDeEcPage } from './interpolacion-sistemas-de-ec/interpolacion-sistemas-de-ec';
import { NewtonDifDivPage } from './newton-dif-div/newton-dif-div';
import { LagrangePage } from './lagrange/lagrange';
import { SplinesPage } from './splines/splines';
import { Splines2Page } from './splines2/splines2';
import { Splines3Page } from './splines3/splines3';

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

  public goDifDiv(){
    this.navCtrl.push(NewtonDifDivPage);
  }

  public goLagrange(){
    this.navCtrl.push(LagrangePage);
  }

  public goSpline(){
    this.navCtrl.push(SplinesPage);
  }

  public goSpline2(){
    this.navCtrl.push(Splines2Page);
  }

  public goSpline3(){
    this.navCtrl.push(Splines3Page);
  }

}
