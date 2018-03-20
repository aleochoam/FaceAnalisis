import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IncrementalPage } from './incremental';

@NgModule({
  declarations: [
    IncrementalPage,
  ],
  imports: [
    IonicPageModule.forChild(IncrementalPage),
  ],
})
export class IncrementalPageModule {}
