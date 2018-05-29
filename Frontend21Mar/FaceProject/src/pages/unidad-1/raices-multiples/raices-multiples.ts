import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GraficadorPage } from '../../../pages/graficador/graficador';

import { HttpEcuacionesUnaVariableProvider } from '../../../providers/http-ecuaciones-una-variable/http-ecuaciones-una-variable';

import { AlertController } from 'ionic-angular';
/**
 * Generated class for the RaicesMultiplesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-raices-multiples',
  templateUrl: 'raices-multiples.html',
})
export class RaicesMultiplesPage {

  private apiUrl = 'http://165.227.197.6:8000/api/newton2/';

  private dataSubmit = {};

  private dataReceivedGet = {};
  private dataReceivedPost = {};

  private root;
  private visibleRoot;

  private titlesTable = ['i', 'xi', 'Error'];
  private titlesTableComplete = ['i', 'xi', 'f(xi)', 'Error'];
  private contentTable = [];
  private visibleTable;
  private visibleTableComplete;
  private selectTable;


  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public httpEcuacionesUnaVariableProvider: HttpEcuacionesUnaVariableProvider) {
    this.dataSubmit['fx'] = '';
    this.dataSubmit['dfx'] = '';
    this.dataSubmit['d2fx'] = '';
    this.dataSubmit['x0'] = '';
    this.dataSubmit['tol'] = '';
    this.dataSubmit['nIters'] = '';

    this.visibleTable = false;
    this.visibleTableComplete = false;
    this.selectTable = false;
    this.visibleRoot = false;
  }


  verification() {
    if (this.dataSubmit['fx'] == '') {
      this.showAlert("Error", 'El campo f(x) no puede estar vacío');

    } else if (this.dataSubmit['dfx'] == '') {
      this.showAlert("Error", "El campo f'(x) no puede estar vacío ");

    } else if (this.dataSubmit['d2fx'] == '') {
      this.showAlert("Error", "El campo f''(x) no puede estar vacío");

    } else if (this.dataSubmit['x0'] == '') {
      this.showAlert("Error", "El campo x Ini no puede estar vacío");

    } else if (this.dataSubmit['tol'] == '') {
      this.showAlert("Error", "El campo Tol no puede estar vacío");

    } else if (this.dataSubmit['nIters'] == '') {
      this.showAlert("Error", "El campo Iters no puede estar vacío");

    } else {
      this.contentTable = [];
      this.postServer();
    }
  }

  goGraficador() {
    var a: string = this.dataSubmit['x0'] + "";
    var b: string = "";
    if (this.dataReceivedPost['aproximado'] != undefined && this.dataReceivedPost['aproximado'] != "" && this.dataSubmit['fx'] != "" && this.dataSubmit['x0'] != "") {
      var aux: number = <number><any>this.dataReceivedPost['aproximado'];
      a = "" + (aux - 0.2);
      b = "" + (aux - (-0.2));
    }

    var send = {
      'funcion': this.dataSubmit['fx'],
      'a': a,
      'b': b
    }
    this.navCtrl.push(GraficadorPage, send);
  }


  ayuda() {
    let alert = this.alertCtrl.create({
      title: 'Consejos!',
      subTitle: ` <ul>
                    <li>El método de Newton y de la secante, ante la presencia de raíces múltiples convergen linealmente y pueden fallar.</li>
                    <br>
                  </ul>`,
      buttons: ['OK']
    });
    alert.present();
  }


  showAlert(error, subtitle) {
    let alert = this.alertCtrl.create({
      title: error,
      subTitle: subtitle,
      buttons: ['OK']
    });
    alert.present();
  }


  completeTable() {
    this.contentTable = this.dataReceivedPost['iteraciones'];

    if (this.contentTable.length != 0) {
      this.root = this.dataReceivedPost['aproximado'];
      this.visibleRoot = true;
      this.elegirTabla();
      

    } else {
      this.visibleTable = false;
      this.visibleRoot = false;
      this.visibleTableComplete = false;
      
      this.showAlert("Fallo", this.dataReceivedPost['error']);
    }

  }

  //Zona de get y post
  getServer() {
    this.httpEcuacionesUnaVariableProvider.get(this.apiUrl)
      .then(data => {
        this.dataReceivedGet = data;
      }, (err) => {
        console.log(err);
      });
  }

  postServer() {
    this.httpEcuacionesUnaVariableProvider.post(this.dataSubmit, this.apiUrl)
      .then(result => {
        this.dataReceivedPost = result;
        this.completeTable();
      }, (err) => {
        console.log(err);
      });
  }

  elegirTabla(){
    if (this.selectTable == true){      
      this.visibleTableComplete = true;
      this.visibleTable = false;
    }else{
      this.visibleTableComplete = false;
      this.visibleTable = true;
    }
  }

  
}
