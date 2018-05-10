import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FactorizacionSimplePage } from './factorizacion-simple';

@NgModule({
  declarations: [
    FactorizacionSimplePage,
  ],
  imports: [
    IonicPageModule.forChild(FactorizacionSimplePage),
  ],
})
export class FactorizacionSimplePageModule {}
