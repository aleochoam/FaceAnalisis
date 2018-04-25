import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  private apiUrl = 'http://165.227.197.6:8000/api/punto_fijo/';
  

  private dataSubmit = {}
  
  private dataReceivedGet = {};
  private dataReceivedPost = {};

  private tableTitles  = []
  private tableContent = []

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public httpEcuacionesUnaVariableProvider: HttpEcuacionesUnaVariableProvider) {
    this.dataSubmit['fx'] = '';
    this.dataSubmit['x0'] = '';
    this.dataSubmit['tol'] = '';
    this.dataSubmit['nIters'] = '';

    this.getServer();
  }

  submitForm() {
    console.log(this.dataSubmit)
    this.verification();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BusquedasIncrementalesPage');
  }

  verification(){
   if (this.dataSubmit['fx'] == ''){
    this.showAlert('f(x)');
   }else if (this.dataSubmit['x0'] == ''){
     this.showAlert('x Inicial');
   }else if (this.dataSubmit['tol'] == ''){
     this.showAlert('Tolerancia');
   }else if(this.dataSubmit['nIters'] == ''){
    this.showAlert('Num. Iters');
   }else{
    console.log("Campos verificados y completos.");
    this.postServer();
   }
  }


  showAlert(value:string) {
    let alert = this.alertCtrl.create({
      title: 'Error!',
      subTitle: 'El campo ' + value + ' no puede estar vacío!',
      buttons: ['OK']
    });
    alert.present();
  }

  private completeTable(){
    this.tableTitles.push(['i','xi','f(xi)','Error'])
    this.tableContent = this.dataReceivedPost['iteraciones'];    
  }

  //Zona de get y post

  public getServer() {
    this.httpEcuacionesUnaVariableProvider.get(this.apiUrl)
    .then(data => {
      this.dataReceivedGet = data;
      console.log("Realice el GET-NEWTON ->");
      console.log(JSON.stringify(data));
      console.log(this.dataReceivedGet);
      console.log(typeof(this.dataReceivedGet));
    }, (err) => {
      console.log("Problema al hacer GET-NEWTON");
      console.log(err);
    });
  }


  public postServer() {
    this.httpEcuacionesUnaVariableProvider.post(this.dataSubmit, this.apiUrl)
    .then(result => {
      this.dataReceivedPost = result;
      this.completeTable();
      console.log("Realice el POST-NEWTON");
      console.log("Envie al server = " + this.dataSubmit + " y me llegó como respuesta " + JSON.stringify(result));
      //this.fromObjectToTable();
    }, (err) => {
      console.log("Problema al hacer POST-NEWTON");
      console.log(err);
    });
  }
}
