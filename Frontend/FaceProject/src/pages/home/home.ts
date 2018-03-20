import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TiposPage } from '../tipos/tipos';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  onGoToTipos(){
    this.navCtrl.push(TiposPage);
  }
}
