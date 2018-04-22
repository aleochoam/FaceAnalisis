import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { HttpBusquedasIncrementalesProvider } from '../../providers/http-busquedas-incrementales/http-busquedas-incrementales';


/**
 * Generated class for the BusquedasIncrementalesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-busquedas-incrementales',
  templateUrl: 'busquedas-incrementales.html',
})
export class BusquedasIncrementalesPage {

  dataSubmit:any = {};

  dataReceived:any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public httpBusquedasIncrementalesProvider : HttpBusquedasIncrementalesProvider) {
    this.dataSubmit['fx'] = '';
    this.dataSubmit['x0'] = '';
    this.dataSubmit['delta'] = '';
    this.dataSubmit['nIters'] = '';
    this.getServer();
  
  } 

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: '¿Qué debo hacer?',
      subTitle: ` <p>Ingresa los siguientes Datos:</p>
                  <ul>
                  <li> <b>Función:</b> La función que desea evaluar</li>
                  <li> <b>X0:</b> Valor Inicial de X </li>
                  <li><b>Delta:</b> Tamaño de intervalo para hayar el próximo X</li>
                  <li><b># Iteraciones:</b> Número máximo de iteraciones</b> </li>
                </ul>`,
      buttons: ['Entendido']
    });
    alert.present();
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
   }else if (this.dataSubmit['delta'] == ''){
     this.showAlert('delta');
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
    this.httpBusquedasIncrementalesProvider.getBusquedasIncrementales()
    .then(data => {
      this.dataReceived = data;
      console.log("Realice el GET-BUSQUEDAS ->");
      console.log(JSON.stringify(data));
    }, (err) => {
      console.log("Problema al hacer GET-BUSQUEDAS");
      console.log(err);
    });
  }


  public postServer() {
    this.httpBusquedasIncrementalesProvider.postBusquedasIncrementales(this.dataSubmit)
    .then(result => {
      this.dataReceived = result;
      console.log("Realice el POST-BUSQUEDAS");
      console.log("Envie al server = " + this.dataSubmit + " y me llegó como respuesta " + JSON.stringify(result));
    }, (err) => {
      console.log("Problema al hacer POST-BUSQUEDAS");
      console.log(err);
    });
  }

}
