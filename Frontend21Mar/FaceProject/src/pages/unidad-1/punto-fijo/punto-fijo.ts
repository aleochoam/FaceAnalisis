import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GraficadorPage } from '../../../pages/graficador/graficador';

import { HttpEcuacionesUnaVariableProvider } from '../../../providers/http-ecuaciones-una-variable/http-ecuaciones-una-variable';


import { AlertController } from 'ionic-angular';
/**
 * Generated class for the PuntoFijoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-punto-fijo',
  templateUrl: 'punto-fijo.html',
})
export class PuntoFijoPage {

  private apiUrl = 'http://165.227.197.6:8080/api/punto_fijo/';
  
  private dataSubmit = {};

  private dataReceivedGet  = {};
  private dataReceivedPost = {};

  private root;
  private visibleRoot;
  
  private titlesTable  = ['i', 'xi', 'Error'];
  private contentTable = [];
  private visibleTable;
  

  private selectTable;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public httpEcuacionesUnaVariableProvider: HttpEcuacionesUnaVariableProvider) {
    this.dataSubmit['fx'] = '';
    this.dataSubmit['x0'] = '';
    this.dataSubmit['tol'] = '';
    this.dataSubmit['nIters'] = '';
    
    this.visibleTable = false;
    this.visibleRoot  = false;
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


  ionViewDidLoad() {
  }

  submitForm() {
    if (this.dataSubmit['fx'] == '') {
      this.showAlert('Error', "El campo g(x) no puede estar vacío");

    } else if (this.dataSubmit['x0'] == '') {
      this.showAlert('Error', "El campo x Ini no puede estar vacío");

    } else if (this.dataSubmit['tol'] == '') {
      this.showAlert('Error', "El campo Tol no puede estar vacío");

    } else if (this.dataSubmit['nIters'] == '') {
      this.showAlert('Error', "El campo Iters no puede estar vacío");

    } else if (this.dataSubmit['tipo_error'] == '') {
      this.showAlert('Error', "El campo Error no puede estar vacío");
      
    } else {
      this.contentTable = [];
      this.postServer();
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


  completeTable() {
    
      if(this.dataReceivedPost['error'] == ""){

        this.contentTable = this.dataReceivedPost['iteraciones'];

        if (this.contentTable.length != 0){
          this.root = this.dataReceivedPost['aproximado'];
          this.visibleTable = true;
          this.visibleRoot = true;  
        }else{
          this.showAlert("Fallo", this.dataReceivedPost['error']);
          this.visibleTable = false;
          this.visibleRoot = false;
          this.contentTable = [];          
        }
        
      }else{
        this.showAlert("Fallo", this.dataReceivedPost['error']);
        this.contentTable = [];       
        this.visibleTable = false;
        this.visibleRoot = false;           
      }
  }


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
        console.log(this.dataReceivedPost);
      }, (err) => {
        console.log(err);
      });
  }




  ayuda() {
    let alert = this.alertCtrl.create({
      title: 'Consejos!',
      subTitle: ` <ul>
                    <li>Buscamos solucionar el problema de x = g(x)</li>
                    <br>
                    <li>Si g es una funcion continua en el intervalo [a,b] y para todo x que pertenece [a,b] se cumple que g(x) pertenece [a,b] entonces g tiene un punto fijo en [a,b]</li>
                    <br>
                    <li>Si para todo x que pertenece (a,b) se cumple que g'(x) existe en (a,b) y |g'(x)| <= k < 1 entonces g tiene un único punto fijo p en [a,b]</li>
                    <br>
                  </ul>`,
      buttons: ['OK']
    });
    alert.present();
  }
}
