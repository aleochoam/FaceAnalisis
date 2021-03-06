import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpEcuacionesUnaVariableProvider } from '../../../providers/http-ecuaciones-una-variable/http-ecuaciones-una-variable';

/**
 * Generated class for the LagrangePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lagrange',
  templateUrl: 'lagrange.html',
})
export class LagrangePage {

  private apiUrl  = 'http://165.227.197.6:8080/api/lagrange/';
  
  showResult = false;
  //Estructura que se enviará al servidor
  datasubmit = {
    X : {},
    Y : {},
    eval: "",
  };

  //Datos recibidos por el servidor
  private dataReceivedGet  = {};
  private dataReceivedPost = {};

  //Variables que nos ayudan a crear las entradas de usuario
  matrix: Array<string> = [];
  n: any;
  input: string;

  eval:any;
  funcion:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl : AlertController, public httpEcuacionesUnaVariableProvider: HttpEcuacionesUnaVariableProvider) {
    this.n = '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GaussSimplePage');
  }
  createMatrix() {
    this.showResult = false;
    this.matrix = [];
   this.datasubmit = {
      X : {},
      Y : {},
      eval: "",
    };

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

  showAlert(error, subtitle) {
    let alert = this.alertCtrl.create({
      title: error,
      subTitle: subtitle,
      buttons: ['OK']
    });
    alert.present();
  }

  submitForm(){
    console.log(this.datasubmit);
    if(this.datasubmit['eval'] == ''){
      console.log("TRUE");
      this.showAlert("OJO!","El punto a evaluar en la función es obligatorio");
    }else{
    console.log(this.datasubmit)
    this.postServer();
    }
  }

  private presentAlert () {
    let alert = this.alertCtrl.create({
      title: '¿Qué debo hacer?',
      subTitle: ` <p>Recomendamos:</p>
                  <ul>
                    <li> <b>Cantidad de Puntos:</b>Cantidad de puntos que se tienen para interpolar</li>
                    <li> <b>El punto a evaluar en la función debe estar en el intervalo!</b></li>

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
    if(this.dataReceivedPost['error'] == null ){
      this.funcion = this.dataReceivedPost['funcion'];
      this.eval = this.dataReceivedPost['y_eval'];

    }else{
        this.showAlert("OJO!",this.dataReceivedPost['error']);
        this.funcion = this.dataReceivedPost['funcion'];
      }
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
