import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpEcuacionesUnaVariableProvider } from '../../../providers/http-ecuaciones-una-variable/http-ecuaciones-una-variable';

/**
 * Generated class for the NewtonDifDivPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-newton-dif-div',
  templateUrl: 'newton-dif-div.html',
})
export class NewtonDifDivPage {

  private apiUrl  = 'http://165.227.197.6:8080/api/newton_diferencias/';
  
  showResult = false;
  //Estructura que se enviará al servidor
  datasubmit = {
    X : {},
    Y : {},
  };

  //Datos recibidos por el servidor
  private dataReceivedGet  = {};
  private dataReceivedPost = {};

  //Variables que nos ayudan a crear las entradas de usuario
  matrix: Array<string> = [];
  n: any;
  input: string;

  funcion:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl : AlertController, public httpEcuacionesUnaVariableProvider: HttpEcuacionesUnaVariableProvider) {
    this.n = '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GaussSimplePage');
  }
  createMatrix() {
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
    console.log(this.datasubmit)
    this.postServer();
  }

  private presentAlert () {
    let alert = this.alertCtrl.create({
      title: '¿Qué debo hacer?',
      subTitle: ` <p>Ingresa los siguientes datos:</p>
                  <ul>
                    <li> <b>Cantidad de Puntos:</b>Cantidad de puntos que se tienen para interpolar</li>
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
    this.funcion = this.dataReceivedPost['funcion'];
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
