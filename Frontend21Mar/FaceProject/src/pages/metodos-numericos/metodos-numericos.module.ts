import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MetodosNumericosPage } from './metodos-numericos';

@NgModule({
  declarations: [
    MetodosNumericosPage,
  ],
  imports: [
    IonicPageModule.forChild(MetodosNumericosPage),
  ],
})
export class MetodosNumericosPageModule {}
