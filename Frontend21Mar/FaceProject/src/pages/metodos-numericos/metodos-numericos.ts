import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { EcuacionesUnaVariablePage } from '../ecuaciones-una-variable/ecuaciones-una-variable';
import { SistemasDeEcuacionesLinealesPage } from '../sistemas-de-ecuaciones-lineales/sistemas-de-ecuaciones-lineales';
import { InterpolacionPage } from '../interpolacion/interpolacion';
import { IntegracionNumericaPage } from '../integracion-numerica/integracion-numerica';
import { EcuacionesDiferencialesPage } from '../ecuaciones-diferenciales/ecuaciones-diferenciales';
import { GraficadorPage } from '../graficador/graficador';

/**
 * Generated class for the MetodosNumericosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-metodos-numericos',
  templateUrl: 'metodos-numericos.html',
})
export class MetodosNumericosPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MetodosNumericosPage');
  }

  public goEcuacionesUnaVariable(){
    this.navCtrl.push(EcuacionesUnaVariablePage);
  }

  public goSistemasDeEcuacionesLineales(){
    this.navCtrl.push(SistemasDeEcuacionesLinealesPage);
  }

  public goInterpolacion(){
    this.navCtrl.push(InterpolacionPage);
  }

  public goIntegracionNumerica(){
    this.navCtrl.push(IntegracionNumericaPage);
  }

  public goEcuacionesDiferenciales(){
    this.navCtrl.push(EcuacionesDiferencialesPage);

  }

  public goGraficador(){
    this.navCtrl.push(GraficadorPage);
  }


}
