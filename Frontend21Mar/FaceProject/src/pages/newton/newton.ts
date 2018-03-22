import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HttpNewtonProvider } from '../../providers/http-newton/http-newton';


import { AlertController } from 'ionic-angular';
/**
 * Generated class for the NewtonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-newton',
  templateUrl: 'newton.html',
})
export class NewtonPage {

  dataSubmit:any = {}

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public httpNewtonProvider:HttpNewtonProvider) {
    this.dataSubmit['fx'] = '';
    this.dataSubmit['dfx'] = '';
    this.dataSubmit['x0'] = '';
    this.dataSubmit['tol'] = '';
    this.dataSubmit['nIters'] = '';
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
   }else if (this.dataSubmit['x0'] == ''){
     this.showAlert('x Inicial');
   }else if (this.dataSubmit['tol'] == ''){
     this.showAlert('Tolerancia');
   }else if(this.dataSubmit['nIters'] == ''){
    this.showAlert('Num. Iters');
   }else{
    console.log("Campos verificados y completos.");
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

}