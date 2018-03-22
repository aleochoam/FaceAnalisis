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
import { BusquedasIncrementalesPage } from '../pages/busquedas-incrementales/busquedas-incrementales';
import { BiseccionPage } from '../pages/biseccion/biseccion';
import { ReglaFalsaPage } from '../pages/regla-falsa/regla-falsa';
import { PuntoFijoPage } from '../pages/punto-fijo/punto-fijo';
import { NewtonPage } from '../pages/newton/newton';
import { SecantePage } from '../pages/secante/secante';
import { RaicesMultiplesPage } from '../pages/raices-multiples/raices-multiples';


import { HttpClientModule } from '@angular/common/http';


import { HttpBusquedasIncrementalesProvider } from '../providers/http-busquedas-incrementales/http-busquedas-incrementales';
import { HttpBiseccionProvider } from '../providers/http-biseccion/http-biseccion';
import { HttpReglaFalsaProvider } from '../providers/http-regla-falsa/http-regla-falsa';
import { HttpPuntoFijoProvider } from '../providers/http-punto-fijo/http-punto-fijo';
import { HttpNewtonProvider } from '../providers/http-newton/http-newton';
import { HttpSecanteProvider } from '../providers/http-secante/http-secante';
import { HttpRaicesMultiplesProvider } from '../providers/http-raices-multiples/http-raices-multiples';



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
    RaicesMultiplesPage
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
    RaicesMultiplesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpBusquedasIncrementalesProvider,
    HttpBiseccionProvider,
    HttpReglaFalsaProvider,
    HttpPuntoFijoProvider,
    HttpNewtonProvider,
    HttpSecanteProvider,
    HttpRaicesMultiplesProvider
  ]
})
export class AppModule {}
