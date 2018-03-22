import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BusquedasIncrementalesPage } from '../busquedas-incrementales/busquedas-incrementales';
import { BiseccionPage } from '../biseccion/biseccion';
import { ReglaFalsaPage } from '../regla-falsa/regla-falsa';
import { PuntoFijoPage } from '../punto-fijo/punto-fijo';
import { NewtonPage } from '../newton/newton';
import { SecantePage } from '../secante/secante';
import { RaicesMultiplesPage } from '../raices-multiples/raices-multiples';



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
