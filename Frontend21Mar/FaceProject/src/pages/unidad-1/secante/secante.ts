import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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


  private apiUrl = 'http://165.227.197.6:8000/api/secante/';

  dataSubmit:any = {}
  dataReceived: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public httpEcuacionesUnaVariableProvider:HttpEcuacionesUnaVariableProvider) {
    this.dataSubmit['fx'] = '';
    this.dataSubmit['x0'] = '';
    this.dataSubmit['x1'] = '';
    this.dataSubmit['tol'] = '';
    this.dataSubmit['nIters'] = '';

    this.getServer();
  }

  submitForm() {
    console.log(this.dataSubmit)
    this.verification();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SecantePage');
  }

  verification(){
   if (this.dataSubmit['fx'] == ''){
    this.showAlert('f(x)');
   }else if (this.dataSubmit['xa'] == ''){
     this.showAlert('xa');
   }else if (this.dataSubmit['xb'] == ''){
     this.showAlert('xb');
   }else if (this.dataSubmit['tol'] == ''){
     this.showAlert('Tolernacia');
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

        //Zona de get y post

  public getServer() {
    this.httpEcuacionesUnaVariableProvider.get(this.apiUrl)
    .then(data => {
      this.dataReceived = data;
      console.log("Realice el GET-SECANTE ->");
      console.log(JSON.stringify(data));
    }, (err) => {
      console.log("Problema al hacer GET-SECANTE");
      console.log(err);
    });
  }
      
      
  public postServer() {
    this.httpEcuacionesUnaVariableProvider.post(this.dataSubmit, this.apiUrl)
    .then(result => {
      this.dataReceived = result;
      console.log("Realice el POST-SECANTE");
      console.log("Envie al server = " + this.dataSubmit + " y me llegó como respuesta " + JSON.stringify(result));
    }, (err) => {
      console.log("Problema al hacer POST-SECANTE");
      console.log(err);
    });
  }

}
