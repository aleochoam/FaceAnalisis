import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { HttpEcuacionesUnaVariableProvider } from '../../../providers/http-ecuaciones-una-variable/http-ecuaciones-una-variable';

/**
 * Generated class for the JacobiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-jacobi',
  templateUrl: 'jacobi.html',
})
export class JacobiPage {


  private apiUrl  = 'http://165.227.197.6:8080/api/jacobi/';
  
  showResult = false;

  datasubmit = {
    A : {},
    b : {},
    x0:{},
  };

  private dataReceivedGet  = {};
  private dataReceivedPost = {};
  matrix: Array<string> = [];
  n: any;
  input: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl : AlertController, public httpEcuacionesUnaVariableProvider: HttpEcuacionesUnaVariableProvider) {
    this.n = '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GaussSimplePage');
  }
  createMatrix() {
    this.matrix = [];
    this.input = "<ion-input class='cell'></ion-input>";
    for (let i = 0; i < this.n; i++) {
      this.matrix.push(String(i));
    }
    console.log(this.matrix);
    console.log(this.matrix.length);
  }
  getN() {
    console.log(this.n);
    return this.n;
  }

  submitForm(){
    console.log(this.datasubmit);
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
  //Zona de Get y Post

  public getServer() {
    this.httpEcuacionesUnaVariableProvider.get(this.apiUrl)
    .then(data => {
      this.dataReceivedGet = data;
    }, (err) => {
      console.log(err);
    });
  }

  private results(){

  }

  public postServer() {
    this.httpEcuacionesUnaVariableProvider.post(this.datasubmit, this.apiUrl)
    .then(result => {
      this.dataReceivedPost = result;
      this.showResult = true;
      this.results();
      console.log(this.dataReceivedPost);
    }, (err) => {
      console.log(err);
    });
  }


}
