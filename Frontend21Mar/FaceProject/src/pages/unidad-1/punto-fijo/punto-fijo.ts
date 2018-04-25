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

  private apiUrl = 'http://165.227.197.6:8080/api/punto_fijo/';
  

  private dataSubmit = {};

  private dataReceivedGet  = {};
  private dataReceivedPost = {};

  private root;
  private visibleRoot;
  
  private titlesTable  = ['i','x Inf','x Sup','x Med', 'f(xMed)', 'Error'];
  private contentTable = [];
  private visibleTable;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public httpEcuacionesUnaVariableProvider: HttpEcuacionesUnaVariableProvider) {
    this.dataSubmit['fx'] = '';
    this.dataSubmit['xa'] = '';
    this.dataSubmit['xb'] = '';
    this.dataSubmit['tol'] = '';
    this.dataSubmit['nIters'] = '';

    this.visibleTable = false;
    this.visibleRoot  = false;
  }

  private submitForm(){
    console.log(this.dataSubmit);
    //Verificar si son campos vacios
    if (this.dataSubmit['fx'] == ''){
        this.showAlert("Error", "El campo f(x) no puede estar vacío");
    }else if (this.dataSubmit['x0'] == ''){
        this.showAlert("Error", "El campo x0 no puede estar vacío.");
    }else if(this.dataSubmit['tole'] == ''){
          this.showAlert("Error", "El campo Tolerancia no puede estar vacío");
    }else if(this.dataSubmit['nIters'] == ''){
        this.showAlert("Error", "El campo Num. Iters no puede estar vacío");      
  //} else if(this.dataSubmit['tipo_error'] == ''){
  //    this.showAlert("Error", "El campo del Tipo de Error no puede estar vacío");
    }else{
        this.postServer();
    }   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BusquedasIncrementalesPage');
  }

  private completeTable(){
    console.log("se supone que por aca ando");
    
    this.contentTable = this.dataReceivedPost['iteraciones'];
    console.log(this.contentTable);
    if (this.contentTable.length != 0){
      this.root = this.dataReceivedPost['aproximados'];
      console.log("La raiz es " + this.root);

      this.visibleTable = true;
      this.visibleRoot  = true;
      
    }else{
      this.visibleTable = false;
      this.visibleRoot  = false;
      this.showAlert("Fallo", this.dataReceivedPost['error']);
    }

    console.log(this.visibleTable);
    console.log(this.visibleRoot);
  }





  private showAlert(error, subtitle) {
    let alert = this.alertCtrl.create({
      title: error,
      subTitle: subtitle,
      buttons: ['OK']
    });
    alert.present();
  }


  //Zona de get y post

  public getServer() {
    this.httpEcuacionesUnaVariableProvider.get(this.apiUrl)
    .then(data => {
      this.dataReceivedGet = data;
    }, (err) => {
      console.log(err);
    });
  }


  public postServer() {
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
