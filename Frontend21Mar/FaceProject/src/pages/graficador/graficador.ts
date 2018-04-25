import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
/**
 * Generated class for the GraficaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-graficador',
  templateUrl: 'graficador.html',
})
export class GraficadorPage {

    @ViewChild('lineCanvas') lineCanvas;
    private graphData ={};
    private lineChart: any;

    private recivedFunc:string; //Este atributo me recibe la funcion que se esta trabajando en el metodo

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.recivedFunc = navParams.data['funcion'];
      console.log("me llego " + this.recivedFunc);

  }

  logForm() {
    console.log(this.graphData);
  }

  ionViewDidLoad() {

    this.lineChart = new Chart(this.lineCanvas.nativeElement, {

    type: 'line',
    data: {
        datasets: [{
            label: 'Grafica',
            data: [{
                x: -10,
                y: -8
            }, {
                x: 0,
                y: 10
            }, {
                x: 10,
                y: 5
            }],
            borderColor: [
              '#0b8c7f',
            ],
        }]
    },

    options: {
        scales: {
            xAxes: [{
                type: 'linear',
                position: 'bottom'
            }]
        }
    }
    });
 }

}
