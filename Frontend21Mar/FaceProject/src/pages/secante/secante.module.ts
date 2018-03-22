import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SecantePage } from './secante';

@NgModule({
  declarations: [
    SecantePage,
  ],
  imports: [
    IonicPageModule.forChild(SecantePage),
  ],
})
export class SecantePageModule {}
