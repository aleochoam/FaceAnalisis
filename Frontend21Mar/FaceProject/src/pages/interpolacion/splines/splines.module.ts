import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SplinesPage } from './splines';

@NgModule({
  declarations: [
    SplinesPage,
  ],
  imports: [
    IonicPageModule.forChild(SplinesPage),
  ],
})
export class SplinesPageModule {}
