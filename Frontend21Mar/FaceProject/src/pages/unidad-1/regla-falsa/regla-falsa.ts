import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GraficadorPage } from '../../../pages/graficador/graficador';

import { HttpEcuacionesUnaVariableProvider } from '../../../providers/http-ecuaciones-una-variable/http-ecuaciones-una-variable';


import { AlertController } from 'ionic-angular';
/**
 * Generated class for the ReglaFalsaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-regla-falsa',
  templateUrl: 'regla-falsa.html',
})
export class ReglaFalsaPage {


  private apiUrl = 'http://165.227.197.6:8080/api/regla_falsa/';

  private dataSubmit = {};

  private dataReceivedGet = {};
  private dataReceivedPost = {};

  private root;
  private visibleRoot;

  private titlesTable = ['i', 'x Med', 'Error'];
  private titlesTableComplete = ['i', 'x Inf', 'x Sup', 'x Med', 'f(xMed)', 'Error'];
  private contentTable = [];
  private visibleTable;
  private visibleTableComplete;
  private selectTable;



  public constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public httpEcuacionesUnaVariableProvider: HttpEcuacionesUnaVariableProvider) {
    this.dataSubmit['fx'] = '';
    this.dataSubmit['xa'] = '';
    this.dataSubmit['xb'] = '';
    this.dataSubmit['nIters'] = '';
    this.dataSubmit['tol'] = '';
    this.dataSubmit['tipo_error'] = '';

    this.visibleTable = false;
    this.visibleTableComplete = false;

    this.visibleRoot = false;
    this.selectTable = false;
  }

  goGraficador() {
    var a: string = this.dataSubmit['xa'] + "";
    var b: string = this.dataSubmit['xb'] + "";

    if (this.dataReceivedPost['aproximados'] != undefined && this.dataReceivedPost['aproximados'] != "" && this.dataSubmit['fx'] != "" && this.dataSubmit['xa'] != "" && this.dataSubmit['xb'] != "") {
      var aux: number = <number><any>this.dataReceivedPost['aproximados'];
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
    } else if (this.dataSubmit['xa'] == '') {
      this.showAlert("Error", "El campo xa no puede estar vacío.");
    } else if (this.dataSubmit['xb'] == '') {
      this.showAlert("Error", "El campo xb no puede estar vacío");
    } else if (this.dataSubmit['tol'] == '') {
      this.showAlert("Error", "El campo Tolerancia no puede estar vacío");
    } else if (this.dataSubmit['nIters'] == '') {
      this.showAlert("Error", "El campo Num. Iters no puede estar vacío");
    } else if (this.dataSubmit['tipo_error'] == '') {
      this.showAlert("Error", "El campo del Tipo de Error no puede estar vacío");
    } else {
      this.contentTable = [];
      this.postServer();
    }
  }


  ayuda() {
    let alert = this.alertCtrl.create({
      title: 'Consejos!',
      subTitle: ` <ul>
                    <li>Este mértodo convera todas las características y condiciones que posee el método de la bisección excepto por la forma de calcular el punto intermedio del intervalo.</li>
                    <br>
                    <li>Decimos que los métodos por intervalos cerrados siempre convergen, algunas veces Regla Falsa puede ser una mejora de Bisección</li>
                    <br>
                    <li>El problema de los métodos por intervalos cerrados es la lentitud de convergencia, es decir, requieren muchas iteraciones.</li>
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
      this.root = this.dataReceivedPost['aproximados'];

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
