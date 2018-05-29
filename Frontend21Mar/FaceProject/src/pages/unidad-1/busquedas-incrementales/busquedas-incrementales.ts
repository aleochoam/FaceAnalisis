import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { GraficadorPage } from '../../../pages/graficador/graficador';

import { HttpEcuacionesUnaVariableProvider } from '../../../providers/http-ecuaciones-una-variable/http-ecuaciones-una-variable';


@IonicPage()
@Component({
  selector: 'page-busquedas-incrementales',
  templateUrl: 'busquedas-incrementales.html',
})
export class BusquedasIncrementalesPage {

  private apiUrl = 'http://165.227.197.6:8080/api/busquedas/';

  private dataSubmit = {};

  private dataReceivedGet = {};
  private dataReceivedPost = {};

  private root;
  private visibleRoot;

  private titlesTable = ['x', 'y'];
  private contentTable = [];
  private visibleTable;

  

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public httpEcuacionesUnaVariableProvider: HttpEcuacionesUnaVariableProvider) {
    this.dataSubmit['fx'] = '';
    this.dataSubmit['x0'] = '';
    this.dataSubmit['delta'] = '';
    this.dataSubmit['nIters'] = '';

    this.visibleTable = false;
    this.visibleRoot = false;
  }

  goGraficador() {

    var a: string = this.dataSubmit['x0'] + "";
    var b: string = "";

    if (this.dataReceivedPost['intervalos'] != undefined && this.dataReceivedPost['intervalos'].length != 0 && this.dataSubmit['fx'] != "" && this.dataSubmit['x0'] != "") {
      let cant_root = this.dataReceivedPost['intervalos'].length;
      a = this.dataReceivedPost['intervalos'][0][0] + "";
      b = this.dataReceivedPost['intervalos'][cant_root - 1][1] + "";
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

    } else if (this.dataSubmit['delta'] == '') {
      this.showAlert("Error", "El campo delta no puede estar vacío");

    } else if (this.dataSubmit['nIters'] == '') {
      this.showAlert("Error", "El campo Iters no puede estar vacío");

    } else {
      this.contentTable = [];
      this.postServer();
    }
  }


  ayuda() {
    let alert = this.alertCtrl.create({
      title: 'Consejos!',
      subTitle: ` <ul>
                    <li>f(x) debe ser una función continua</li>
                    <br>
                    <li>Si f(x) está definida en [a,b] y se cumple que: f(a) * f(b) < 0, entonces existe algún Xm en [a,b] que es raíz</li>
                    <br>  
                    <li>Existe raíz única si se cumple que f es continua en [a,b], f(a) * f(b) < 0, f es diferenciable en (a,b) y f'(x) no cambia de signo para todo x que pertenece [a,b]</li>
                    
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
    this.contentTable = this.dataReceivedPost['intervalos'];

    if (this.contentTable.length != 0) {
      this.root = (this.contentTable.length == 1) ? "Se encontró 1 intervalo:" : "Se encontró los siguientes intervalos:";

      this.visibleTable = true;
      this.visibleRoot = true;

    } else {
      this.visibleTable = false;
      this.visibleRoot = false;
      this.contentTable = [];
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
        console.log(result);
        this.completeTable();
      }, (err) => {
        console.log(err);
      });
  }
}
