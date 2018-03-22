import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BusquedasIncrementalesPage } from './busquedas-incrementales';

@NgModule({
  declarations: [
    BusquedasIncrementalesPage,
  ],
  imports: [
    IonicPageModule.forChild(BusquedasIncrementalesPage),
  ],
})
export class BusquedasIncrementalesPageModule {}
