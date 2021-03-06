import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpEcuacionesUnaVariableProvider } from '../../../providers/http-ecuaciones-una-variable/http-ecuaciones-una-variable';

/**
 * Generated class for the DoolittlePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-doolittle',
  templateUrl: 'doolittle.html',
})
export class DoolittlePage {
  private apiUrl  = 'http://165.227.197.6:8080/api/doolittle/';
  
  showResult = false;

  datasubmit = {
    A : {},
    b : {},
  };

  xs = [];
  L : any;
  U: any;
  z = [];

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
      this.xs = this.dataReceivedPost['x'];
      this.L = this.dataReceivedPost['L'];
      this.U = this.dataReceivedPost['U'];
      this.z = this.dataReceivedPost['z'];
      console.log(this.dataReceivedPost);
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
