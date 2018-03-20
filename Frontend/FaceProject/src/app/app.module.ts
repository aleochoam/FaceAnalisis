import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TiposPage } from '../pages/tipos/tipos';
import {UnaVariablePage} from '../pages/una-variable/una-variable';
import {IncrementalPage} from '../pages/una-variable/incremental/incremental';
import {GraficaPage} from '../pages/grafica/grafica';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TiposPage,
    UnaVariablePage,
    IncrementalPage,
    GraficaPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TiposPage,
    UnaVariablePage,
    IncrementalPage,
    GraficaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
