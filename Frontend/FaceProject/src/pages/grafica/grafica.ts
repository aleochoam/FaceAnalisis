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
  selector: 'page-grafica',
  templateUrl: 'grafica.html',
})
export class GraficaPage {

  graphData ={};
  @ViewChild('lineCanvas') lineCanvas;

   lineChart: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
