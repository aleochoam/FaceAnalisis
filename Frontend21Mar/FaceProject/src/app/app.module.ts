import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';


import { HomePage } from '../pages/home/home';
import { MetodosNumericosPage } from '../pages/metodos-numericos/metodos-numericos';
import { EcuacionesUnaVariablePage } from '../pages/ecuaciones-una-variable/ecuaciones-una-variable';
import { SistemasDeEcuacionesLinealesPage } from '../pages/sistemas-de-ecuaciones-lineales/sistemas-de-ecuaciones-lineales';
import { InterpolacionPage } from '../pages/interpolacion/interpolacion';
import { IntegracionNumericaPage } from '../pages/integracion-numerica/integracion-numerica';
import { EcuacionesDiferencialesPage } from '../pages/ecuaciones-diferenciales/ecuaciones-diferenciales';
import { GraficadorPage } from '../pages/graficador/graficador';
import { BusquedasIncrementalesPage } from '../pages/unidad-1/busquedas-incrementales/busquedas-incrementales';
import { BiseccionPage } from '../pages/unidad-1/biseccion/biseccion';
import { ReglaFalsaPage } from '../pages/unidad-1/regla-falsa/regla-falsa';
import { PuntoFijoPage } from '../pages/unidad-1/punto-fijo/punto-fijo';
import { NewtonPage } from '../pages/unidad-1/newton/newton';
import { SecantePage } from '../pages/unidad-1/secante/secante';
import { RaicesMultiplesPage } from '../pages/unidad-1/raices-multiples/raices-multiples';
import { GaussSimplePage } from '../pages/sistemas-de-ecuaciones-lineales/gauss-simple/gauss-simple';


import { HttpClientModule } from '@angular/common/http';

import { HttpEcuacionesUnaVariableProvider } from '../providers/http-ecuaciones-una-variable/http-ecuaciones-una-variable';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MetodosNumericosPage,
    EcuacionesUnaVariablePage,
    SistemasDeEcuacionesLinealesPage,
    InterpolacionPage,
    IntegracionNumericaPage,
    EcuacionesDiferencialesPage,
    GraficadorPage,
    BusquedasIncrementalesPage,
    BiseccionPage,
    ReglaFalsaPage,
    PuntoFijoPage,
    NewtonPage,
    SecantePage,
    RaicesMultiplesPage,
    GaussSimplePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MetodosNumericosPage,
    EcuacionesUnaVariablePage,
    SistemasDeEcuacionesLinealesPage,
    InterpolacionPage,
    IntegracionNumericaPage,
    EcuacionesDiferencialesPage,
    GraficadorPage,
    BusquedasIncrementalesPage,
    BiseccionPage,
    ReglaFalsaPage,
    PuntoFijoPage,
    NewtonPage,
    SecantePage,
    RaicesMultiplesPage,
    GaussSimplePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpEcuacionesUnaVariableProvider,
    
  ]
})
export class AppModule {}
