import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BusquedasIncrementalesPage } from '../unidad-1/busquedas-incrementales/busquedas-incrementales';
import { BiseccionPage } from '../unidad-1/biseccion/biseccion';
import { ReglaFalsaPage } from '../unidad-1/regla-falsa/regla-falsa';
import { PuntoFijoPage } from '../unidad-1/punto-fijo/punto-fijo';
import { NewtonPage } from '../unidad-1/newton/newton';
import { SecantePage } from '../unidad-1/secante/secante';
import { RaicesMultiplesPage } from '../unidad-1/raices-multiples/raices-multiples';

/**
 * Generated class for the EcuacionesUnaVariablePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ecuaciones-una-variable',
  templateUrl: 'ecuaciones-una-variable.html',
})
export class EcuacionesUnaVariablePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EcuacionesUnaVariablePage');
  }

  public goBusquedasIncrementales(){
    this.navCtrl.push(BusquedasIncrementalesPage);
  }

  public goBiseccion(){
    this.navCtrl.push(BiseccionPage);
  }

  public goReglaFalsa(){
    this.navCtrl.push(ReglaFalsaPage);
  }

  public goPuntoFijo(){
    this.navCtrl.push(PuntoFijoPage);
  }

  public goNewton(){
    this.navCtrl.push(NewtonPage);
  }

  public goSecante(){
    this.navCtrl.push(SecantePage);
  }

  public goRaicesMultiples(){
    this.navCtrl.push(RaicesMultiplesPage);
  }

}
