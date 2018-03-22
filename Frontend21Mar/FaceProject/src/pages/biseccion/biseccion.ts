import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HttpBiseccionProvider } from '../../providers/http-biseccion/http-biseccion';

import { AlertController } from 'ionic-angular';

/**
 * Generated class for the BiseccionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-biseccion',
  templateUrl: 'biseccion.html',
})
export class BiseccionPage {

  dataSubmit:any = {}

  dataReceived: any;

  
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public httpBiseccionProvider : HttpBiseccionProvider) {
    this.dataSubmit['fx'] = '';
    this.dataSubmit['xa'] = '';
    this.dataSubmit['xb'] = '';
    this.dataSubmit['nIters'] = '';
    this.dataSubmit['tole'] = '';

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
   }else if (this.dataSubmit['xa'] == ''){
     this.showAlert('xa');
   }else if (this.dataSubmit['xb'] == ''){
     this.showAlert('xb');
   }else if(this.dataSubmit['nIters'] == ''){
    this.showAlert('Num. Iters');
   } else if(this.dataSubmit['tole'] == ''){
    this.showAlert('Tolerancia');
   }else{
    console.log("Campos verificados y completos.");
    console.log("Enviando el POST!!!!")
    this.postServer();
   }   
  }


  showAlert(value:any) {
    let alert = this.alertCtrl.create({
      title: 'Error!',
      subTitle: 'El campo ' + value + ' no puede estar vacío!',
      buttons: ['OK']
    });
    alert.present();
  }


  //Zona de get y post

  public getServer() {
    this.httpBiseccionProvider.getBiseccion()
    .then(data => {
      this.dataReceived = data;
      console.log("Realice el GET-BISECCION ->");
      console.log(JSON.stringify(data));
    }, (err) => {
      console.log("Problema al hacer GET-BISECCION");
      console.log(err);
    });
  }


  public postServer() {
    this.httpBiseccionProvider.postBiseccion(this.dataSubmit)
    .then(result => {
      this.dataReceived = result;
      console.log("Realice el POST-BISECCION");
      console.log("Envie al server = " + this.dataSubmit + " y me llegó como respuesta " + JSON.stringify(result));
    }, (err) => {
      console.log("Problema al hacer POST-BISECCION");
      console.log(err);
    });
  }

}
