import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { GraficadorPage } from '../../../pages/graficador/graficador';

import { HttpEcuacionesUnaVariableProvider } from '../../../providers/http-ecuaciones-una-variable/http-ecuaciones-una-variable';

import { AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-biseccion',
  templateUrl: 'biseccion.html',
})

export class BiseccionPage {

  private apiUrl = 'http://165.227.197.6:8080/api/biseccion/';

  private dataSubmit = {};

  private dataReceivedGet = {};
  private dataReceivedPost = {};

  private root;
  private visibleRoot;

  private titlesTable = ['i', 'x Med', 'Error'];
  private visibleTable;

  private titlesTableComplete = ['i', 'x Inf', 'x Sup', 'x Med', 'f(xMed)', 'Error'];
  private visibleTableComplete;

  private contentTable = [];
  private selectTable;
  


  public constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public httpEcuacionesUnaVariableProvider: HttpEcuacionesUnaVariableProvider) {
    this.dataSubmit['fx'] = '';
    this.dataSubmit['xa'] = '';
    this.dataSubmit['xb'] = '';
    this.dataSubmit['nIters'] = '';
    this.dataSubmit['tole'] = '';
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
    } else if (this.dataSubmit['tole'] == '') {
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
                    <li>f(x) debe ser una función continua</li>
                    <br>
                    <li>Para encontrar un intervalo adecuado [a,b] ayúdese de búsquedas incrementales</li>
                    <br>
                    <li>Existe raíz única si se cumple que f es continua en [a,b], f(a) * f(b) < 0, f es diferenciable en (a,b) y f'(x) no cambia de signo para todo x que pertenece [a,b]</li>
                    <br>
                    <li>La cota para el error absoluto en cada etapa es En = (En - 1) / 2</li>
                    <br>
                    <li>Para saber el número de iteraciones donde converge se aplica la formula iters > (log(b-a) - log(tol))/2 </li>
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
      this.visibleRoot = true;
      this.elegirTabla();

    } else {
      this.visibleTable = false;
      this.visibleTableComplete = false;
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
        console.log(this.dataReceivedPost);
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



