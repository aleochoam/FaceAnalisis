import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MetodosNumericosPage } from '../metodos-numericos/metodos-numericos';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  
  public goMetodosNumericos(){
    this.navCtrl.push(MetodosNumericosPage);
  }
}
