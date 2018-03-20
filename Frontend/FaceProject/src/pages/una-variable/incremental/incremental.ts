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
                  <li> <b>Función: La función que desea evaluar</b></li>
                  <li> <b>X0: Valor Inicial de X </b></li>
                  <li><b>Delta: Tamaño de intervalo para hayar el próximo X </b></li>
                  <li>>b># Iteraciones: Número máximo de iteraciones</b> </li>
                </ul>`,
      buttons: ['Entendido']
    });
    alert.present();
  }

  goToGrafica(){
    this.navCtrl.push(GraficaPage);
  }

}
