import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { HttpEcuacionesUnaVariableProvider } from '../../providers/http-ecuaciones-una-variable/http-ecuaciones-una-variable';

import { Chart } from 'chart.js';


@IonicPage()
@Component({
  selector: 'page-graficador',
  templateUrl: 'graficador.html',
})
export class GraficadorPage {

    @ViewChild('lineCanvas') lineCanvas;
    private graphData ={};
    private lineChart: any;


    private apiUrl = "http://165.227.197.6:8080/api/plot/";


    private dataSubmit = {};
    private dataReceivedPost = {};

    
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController, public httpEcuacionesUnaVariableProvider:HttpEcuacionesUnaVariableProvider) {
      this.dataSubmit['funcion'] = navParams.data['funcion'];
      this.dataSubmit['xa']      = navParams.data['a'];
      this.dataSubmit['xb']      = navParams.data['b'];
      this.dataSubmit['delta']   = "0.1";    
     
      console.log("me llega como a" + navParams.data['a'] + "y de tipo" + typeof navParams.data['a']);
      console.log("me llega como b" + navParams.data['b'] + "y de tipo" + typeof navParams.data['b']);
  }


    ayuda() {
        let alert = this.alertCtrl.create({
        title: '¿Qué debo hacer?',
        subTitle: ` <p>Ingresa los siguientes datos:</p>
                      <ul>
                        <li> <b>fx:</b> Función a evaluar</li>
                        <li> <b>xa, xb:</b> Intervalo inicial</li>
                        <li><b>Tolerancia:</b> Calidad de respuesta</li>
                        <li><b>Num. Iters:</b> Veces ejecutadas</b> </li>
                        <li><b>Absoluto:</b> Error Absoluto</b> </li>
                        <li><b>Relativo:</b> Error Relativo</b> </li>
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


    submitForm(){
      //Verificar si son campos vacios
      if (this.dataSubmit['funcion'] == ''){
          this.showAlert("Error", "El campo f(x) no puede estar vacío");

      }else if (this.dataSubmit['xa'] == ''){
          this.showAlert("Error", "El campo a no puede estar vacío.");

      }else if (this.dataSubmit['xb'] == ''){
          this.showAlert("Error", "El campo b no puede estar vacío");

      }else if (this.dataSubmit['delta'] == ''){
          this.showAlert("Error", "El campo delta no puede estar vacío");

      }else{
          this.postServer();
      }   
    }

    drawFunction(points){
      this.lineChart = new Chart(this.lineCanvas.nativeElement, {

        type: 'line',
        data: {
            datasets: [{
                data: points,
                borderColor: [
                  '#001f51',
                ],
                borderWidth: 0.5
            }]
        },  
    
        options: {
            scales: {
                xAxes: [{
                    type: 'linear',
                    position: 'bottom'
                }]
            },
            elements: {
                point: {
                    radius: 0
                }
            }
        }
        });
    }

    ionViewDidLoad() {
      if ((this.dataSubmit['funcion'] != "") && (this.dataSubmit['xa'] != "") && (this.dataSubmit['xb'] != '') && (this.dataSubmit['delta'] != "")){
          this.postServer();
          this.verificarPost();
      }else{
          this.drawFunction({});
      }

    }

    verificarPost(){
        if (this.dataReceivedPost['error'] != null){
            this.showAlert("Error", this.dataReceivedPost['error']);
        }else{
            this.drawFunction(this.dataReceivedPost['data']);
        }
    }


   //Zona de get y post


  public postServer() {
      console.log(this.dataSubmit);
    this.httpEcuacionesUnaVariableProvider.post(this.dataSubmit, this.apiUrl)
    .then(result => {
      this.dataReceivedPost = result;
      this.verificarPost();
    }, (err) => {
      console.log(err);
    });
  }


}
