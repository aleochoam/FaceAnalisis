import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PuntoFijoPage } from './punto-fijo';

@NgModule({
  declarations: [
    PuntoFijoPage,
  ],
  imports: [
    IonicPageModule.forChild(PuntoFijoPage),
  ],
})
export class PuntoFijoPageModule {}
