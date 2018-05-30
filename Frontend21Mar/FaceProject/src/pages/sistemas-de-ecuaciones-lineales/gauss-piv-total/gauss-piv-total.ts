import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpEcuacionesUnaVariableProvider } from '../../../providers/http-ecuaciones-una-variable/http-ecuaciones-una-variable';

/**
 * Generated class for the GaussPivTotalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gauss-piv-total',
  templateUrl: 'gauss-piv-total.html',
})
export class GaussPivTotalPage {
  private apiUrl  = 'http://165.227.197.6:8080/api/eliminacion_piv_total/';
  
  showResult = false;

  //estructuración de la matriz y arreglo que se enviaran al servidor
  datasubmit = {
    A : {},
    b : {},
  };

  //Estructuración de lo que se recibe en el post
  xs = [];
  escalonada : any;

  private dataReceivedGet  = {};
  private dataReceivedPost = {};

 //Variables para conocer la dimensión de la matriz que el usuario pide
  matrix: Array<string> = [];
  n: any;
  input: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl : AlertController, public httpEcuacionesUnaVariableProvider: HttpEcuacionesUnaVariableProvider) {
    this.n = '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GaussPivTotalPage');
  }
  createMatrix() {
    this.showResult = false;
    this.matrix = [];
    this.datasubmit = {
      A : {},
      b : {},
    };
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
      subTitle: ` <p>Recuerda:</p>
                  <ul>
                    <li>La matriz A debe ser invertible</li>
                  </ul>`,
      buttons: ['OK']
    });
    alert.present();
  }


  private results(){
    if(this.dataReceivedPost['error'] == null ){
    this.xs = this.dataReceivedPost['x'];
    this.escalonada = this.dataReceivedPost['augmented'];
    console.log(this.escalonada);
    }else{
      this.showAlert("OJO!",this.dataReceivedPost['error']);
    }
  }

  showAlert(error, subtitle) {
    let alert = this.alertCtrl.create({
      title: error,
      subTitle: subtitle,
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
