import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the GaussSimplePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gauss-simple',
  templateUrl: 'gauss-simple.html',
})
export class GaussSimplePage {

  n: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl : AlertController) {
    this.n = '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GaussSimplePage');
  }

  createMatrix() {
    console.log(this.n);
    for (let i = 0; i < this.n; i++) {
      for (let j = 0; j < this.n; j++) {
        
        
      }
      
    }
  }
}
