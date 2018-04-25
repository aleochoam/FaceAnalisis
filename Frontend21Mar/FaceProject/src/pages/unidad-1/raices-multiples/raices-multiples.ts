import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  

  dataSubmit:any = {}
  dataReceived:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public httpEcuacionesUnaVariableProvider: HttpEcuacionesUnaVariableProvider) {
    this.dataSubmit['fx'] = '';
    this.dataSubmit['dfx'] = '';
    this.dataSubmit['d2fx'] = '';
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
    console.log('ionViewDidLoad NewtonPage');
  }

  verification(){
   if (this.dataSubmit['fx'] == ''){
    this.showAlert('f(x)');
   }else if (this.dataSubmit['dfx'] == ''){
     this.showAlert('f\'(x)');
   }else if (this.dataSubmit['d2fx'] == ''){
     this.showAlert('f\'\'(x)');
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

    //Zona de get y post

    public getServer() {
      this.httpEcuacionesUnaVariableProvider.get(this.apiUrl)
      .then(data => {
        this.dataReceived = data;
        console.log("Realice el GET-REGLA FALSA ->");
        console.log(JSON.stringify(data));
      }, (err) => {
        console.log("Problema al hacer GET-REGLA FALSA");
        console.log(err);
      });
    }
  
  
    public postServer() {
      this.httpEcuacionesUnaVariableProvider.post(this.dataSubmit, this.apiUrl)
      .then(result => {
        this.dataReceived = result;
        console.log("Realice el POST-REGLA FALSA");
        console.log("Envie al server = " + this.dataSubmit + " y me llegó como respuesta " + JSON.stringify(result));
      }, (err) => {
        console.log("Problema al hacer POST-REGLA FALSA");
        console.log(err);
      });
    }

}
