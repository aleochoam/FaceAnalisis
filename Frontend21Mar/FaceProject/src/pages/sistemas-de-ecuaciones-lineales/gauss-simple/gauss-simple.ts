import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
<<<<<<< HEAD

=======
>>>>>>> 52c34c77e66fd69a4d9865a53cbe7eea7aa0063a
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

  matrix: Array<string> = [];
  n: any;
  input: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl : AlertController) {
    this.n = '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GaussSimplePage');
  }

  getN() {
    console.log(this.n);
    return this.n;
  }

  createMatrix() {
    this.input = "<ion-input class='cell'></ion-input>";
    for (let i = 0; i < this.n; i++) {
      this.matrix.push(String(i));
    }
    console.log(this.matrix);
    console.log(this.matrix.length);
  }
}
