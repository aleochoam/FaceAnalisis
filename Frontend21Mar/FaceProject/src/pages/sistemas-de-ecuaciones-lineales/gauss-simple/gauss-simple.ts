import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the GaussSimplePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gauss-simple',
  templateUrl: 'gauss-simple.html',
})
export class GaussSimplePage {
  datasubmit = {
    A : {},
    b : {},
  };
  matrix: Array<string> = [];
  n: any;
  input: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl : AlertController) {
    this.n = '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GaussSimplePage');
  }

  getN() {
    console.log(this.n);
    return this.n;
  }

  createMatrix() {
    this.input = "<ion-input class='cell'></ion-input>";
    for (let i = 0; i < this.n; i++) {
      this.matrix.push(String(i));
    }
    console.log(this.matrix);
    console.log(this.matrix.length);
  }
  submitForm(){
    console.log(this.datasubmit)
  }
  private presentAlert () {
    let alert = this.alertCtrl.create({
      title: '¿Qué debo hacer?',
      subTitle: ` <p>Ingresa los siguientes datos:</p>
                  <ul>
                    <li> <b>Dimensión:</b> Cantidad de variables a evaluar</li>
                    <li> <b>Matriz:</b> Coeficientes de las variables a evaluar</li>
                    <li><b>b:</b> Vector b de la ecuación Ax = b</li>
                  </ul>`,
      buttons: ['OK']
    });
    alert.present();
  }
}
