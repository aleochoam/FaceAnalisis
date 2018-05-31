import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpEcuacionesUnaVariableProvider } from '../../../providers/http-ecuaciones-una-variable/http-ecuaciones-una-variable';

/**
 * Generated class for the SorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sor',
  templateUrl: 'sor.html',
})
export class SorPage {


  private apiUrl  = 'http://165.227.197.6:8080/api/sor/';
  
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
  private contentTable = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl : AlertController, public httpEcuacionesUnaVariableProvider: HttpEcuacionesUnaVariableProvider) {
    this.n = '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GaussSimplePage');
  }
  createMatrix() {
    this.showResult = false;
    this.datasubmit = {
      A : {},
      b : {},
      x0:{},
    };
    this.matrix = [];
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
    this.postServer();
  }

  private presentAlert () {
    let alert = this.alertCtrl.create({
      title: 'Recuerda:',
      subTitle: ` <p>Para que los métodos iterativos converjan a una única Solución:</p>
                  <ul>
                    <li>El radio Espectral de T debe ser <b>menor</b> que 1</li>
                    <li>La norma de T debe ser <b>menor</b> que 1</li>
                    <li>w debe estar entre 0 < w < 2</li>
                  </ul>
                  <p><b>Para medir la dispersión se usa norma 2</b></p>`,
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
      this.contentTable = this.dataReceivedPost['iteraciones'];
      this.showResult = true;

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
