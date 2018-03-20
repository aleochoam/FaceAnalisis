import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { GraficaPage } from '../../grafica/grafica';

@IonicPage()
@Component({
  selector: 'page-incremental',
  templateUrl: 'incremental.html',
})
export class IncrementalPage {
  data = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
  }

  
  logForm() {
    console.log(this.data);
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: '¿Qué debo hacer?',
      subTitle: ` <p>Ingresa los siguientes Datos:</p>
                  <ul>
                  <li> X0: Valor Inicial de X </li>
                  <li>Delta: Tamaño de intervalo para hayar el próximo X </li>
                  <li># Iteraciones: Número máximo de iteraciones </li>
                </ul>`,
      buttons: ['Entendido']
    });
    alert.present();
  }

  goToGrafica(){
    this.navCtrl.push(GraficaPage);
  }

}
