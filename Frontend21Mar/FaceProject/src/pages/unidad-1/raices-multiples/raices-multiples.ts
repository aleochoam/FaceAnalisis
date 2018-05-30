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

  private apiUrl = 'http://165.227.197.6:8080/api/newton2/';

  private dataSubmit = {};

  private dataReceivedGet = {};
  private dataReceivedPost = {};

  private root;
  private visibleRoot;

  private titlesTable = ['i', 'xi', 'Error'];
  private contentTable = [];
  private visibleTable;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public httpEcuacionesUnaVariableProvider: HttpEcuacionesUnaVariableProvider) {
    this.dataSubmit['fx'] = '';
    this.dataSubmit['dfx'] = '';
    this.dataSubmit['d2fx'] = '';
    this.dataSubmit['x0'] = '';
    this.dataSubmit['tol'] = '';
    this.dataSubmit['nIters'] = '';

    this.visibleTable = false;
    this.visibleRoot = false;
  }


  submitForm() {
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
      subTitle: ` <ul style="text-align: justify">
                    <li>Se dice que Xv es una raíz de multiplicidad m de f si y sólo si f(x) puede escribirse como f(X)=(X-Xv)^m * q(X) en donde q(Xv) != . Si m = 1, se le llama raíz simple.</li>                    
                    <li>Los métodos de Newton y Secante pueden Fallar. Ralston y Rabinowitz han propuesto: Adicionar un factor que exprese la multiplicidad m de la raiz que se busca con el metodo de Newton, la segunda alternativa está dada por la aplicaicón del metodo de Newton a una función auxiliar u, mediante la cual se pueden detectar las raíces de la ecuación f(x)=0 </li>
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
        console.log(this.dataReceivedPost);
        this.completeTable();
      }, (err) => {
        console.log(err);
      });
  }

}
