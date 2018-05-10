import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GraficadorPage } from '../../../pages/graficador/graficador';

import { HttpEcuacionesUnaVariableProvider } from '../../../providers/http-ecuaciones-una-variable/http-ecuaciones-una-variable';


import { AlertController } from 'ionic-angular';
/**
 * Generated class for the SecantePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-secante',
  templateUrl: 'secante.html',
})
export class SecantePage {


  private apiUrl = 'http://165.227.197.6:8080/api/secante/';

  private dataSubmit = {};

  private dataReceivedGet = {};
  private dataReceivedPost = {};

  private root;
  private visibleRoot;

  private titlesTable = ['i', 'xi', 'f(xi)', 'Error'];
  private contentTable = [];
  private visibleTable;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public httpEcuacionesUnaVariableProvider: HttpEcuacionesUnaVariableProvider) {
    this.dataSubmit['fx'] = '';
    this.dataSubmit['x0'] = '';
    this.dataSubmit['x1'] = '';
    this.dataSubmit['tol'] = '';
    this.dataSubmit['nIters'] = '';

    this.visibleTable = false;
    this.visibleRoot = false;
  }

  goGraficador() {
    var a: string = this.dataSubmit['x0'] + "";
    var b: string = this.dataSubmit['x1'] + "";

    if (this.dataReceivedPost['aproximado'] != undefined && this.dataReceivedPost['aproximado'] != "" && this.dataSubmit['fx'] != "" && this.dataSubmit['x0'] != "" && this.dataSubmit['x1'] != "") {
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

  ionViewDidLoad() {
  }


  submitForm() {
    console.log(this.dataSubmit);
    //Verificar si son campos vacios
    if (this.dataSubmit['fx'] == '') {
      this.showAlert("Error", "El campo f(x) no puede estar vacío");

    } else if (this.dataSubmit['x0'] == '') {
      this.showAlert("Error", "El campo x0 no puede estar vacío.");

    } else if (this.dataSubmit['x1'] == '') {
      this.showAlert("Error", "El campo x1 no puede estar vacío");

    } else if (this.dataSubmit['tol'] == '') {
      this.showAlert("Error", "El campo Tolerancia no puede estar vacío");

    } else if (this.dataSubmit['nIters'] == '') {
      this.showAlert("Error", "El campo Iters no puede estar vacío");

    } else if (this.dataSubmit['tipo_error'] == '') {
      this.showAlert("Error", "El campo Error no puede estar vacío");

    } else {
      this.contentTable = [];
      this.postServer();
    }
  }


  ayuda() {
    let alert = this.alertCtrl.create({
      title: '¿Qué debo hacer?',
      subTitle: ` <p>Ingresa los siguientes datos:</p>
                    <ul>
                      <li><b>fx:</b> Función a evaluar</li>
                      <li><b>xa, xb:</b> Intervalo inicial</li>
                      <li><b>Tolerancia:</b> Calidad de respuesta</li>
                      <li><b>Num. Iters:</b> Veces ejecutadas</b> </li>
                      <li><b>Absoluto:</b> Error Absoluto</b> </li>
                      <li><b>Relativo:</b> Error Relativo</b> </li>
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
    console.log(this.dataReceivedPost);
    this.contentTable = this.dataReceivedPost['iteraciones'];

    if (this.contentTable.length != 0) {
      this.root = this.dataReceivedPost['aproximado'];

      this.visibleTable = true;
      this.visibleRoot = true;

    } else {
      this.visibleTable = false;
      this.visibleRoot = false;
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
}
