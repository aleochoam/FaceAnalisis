import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BiseccionPage } from './biseccion';

@NgModule({
  declarations: [
    BiseccionPage,
  ],
  imports: [
    IonicPageModule.forChild(BiseccionPage),
  ],
})
export class BiseccionPageModule {}
