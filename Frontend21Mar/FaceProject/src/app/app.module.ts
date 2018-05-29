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
import { GraficadorPage } from '../pages/graficador/graficador';
import { BusquedasIncrementalesPage } from '../pages/unidad-1/busquedas-incrementales/busquedas-incrementales';
import { BiseccionPage } from '../pages/unidad-1/biseccion/biseccion';
import { ReglaFalsaPage } from '../pages/unidad-1/regla-falsa/regla-falsa';
import { PuntoFijoPage } from '../pages/unidad-1/punto-fijo/punto-fijo';
import { NewtonPage } from '../pages/unidad-1/newton/newton';
import { SecantePage } from '../pages/unidad-1/secante/secante';
import { RaicesMultiplesPage } from '../pages/unidad-1/raices-multiples/raices-multiples';
import { GaussSimplePage } from '../pages/sistemas-de-ecuaciones-lineales/gauss-simple/gauss-simple';
import { GaussPivParcialPage } from '../pages/sistemas-de-ecuaciones-lineales/gauss-piv-parcial/gauss-piv-parcial';
import { GaussPivTotalPage } from '../pages/sistemas-de-ecuaciones-lineales/gauss-piv-total/gauss-piv-total';
import { FactorizacionSimplePage } from '../pages/sistemas-de-ecuaciones-lineales/factorizacion-simple/factorizacion-simple';
import { FactorizacionParcialPage } from '../pages/sistemas-de-ecuaciones-lineales/factorizacion-parcial/factorizacion-parcial';
import { CroutPage } from '../pages/sistemas-de-ecuaciones-lineales/crout/crout';
import { DoolittlePage } from '../pages/sistemas-de-ecuaciones-lineales/doolittle/doolittle';
import { HttpEcuacionesUnaVariableProvider } from '../providers/http-ecuaciones-una-variable/http-ecuaciones-una-variable';
import { CholeskyPage } from '../pages/sistemas-de-ecuaciones-lineales/cholesky/cholesky';
import { InterpolacionSistemasDeEcPage } from '../pages/interpolacion/interpolacion-sistemas-de-ec/interpolacion-sistemas-de-ec';
import { JacobiPage } from '../pages/sistemas-de-ecuaciones-lineales/jacobi/jacobi';
import { SeidelPage } from '../pages/sistemas-de-ecuaciones-lineales/seidel/seidel';
import { SorPage } from '../pages/sistemas-de-ecuaciones-lineales/sor/sor';
import { NewtonDifDivPage } from '../pages/interpolacion/newton-dif-div/newton-dif-div';
import { LagrangePage } from '../pages/interpolacion/lagrange/lagrange';
import { SplinesPage } from '../pages/interpolacion/splines/splines';
import { Splines2Page } from '../pages/interpolacion/splines2/splines2';
import { Splines3Page } from '../pages/interpolacion/splines3/splines3';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MetodosNumericosPage,
    EcuacionesUnaVariablePage,
    SistemasDeEcuacionesLinealesPage,
    InterpolacionPage,
    GraficadorPage,
    BusquedasIncrementalesPage,
    BiseccionPage,
    ReglaFalsaPage,
    PuntoFijoPage,
    NewtonPage,
    SecantePage,
    RaicesMultiplesPage,
    GaussSimplePage,
    GaussPivParcialPage,
    GaussPivTotalPage,
    FactorizacionSimplePage,
    FactorizacionParcialPage,
    CroutPage,
    DoolittlePage,
    CholeskyPage,
    InterpolacionSistemasDeEcPage,
    JacobiPage,
    SeidelPage,
    SorPage,
    NewtonDifDivPage,
    InterpolacionSistemasDeEcPage,
    LagrangePage,
    SplinesPage,
    Splines2Page,
    Splines3Page
  
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
    GraficadorPage,
    BusquedasIncrementalesPage,
    BiseccionPage,
    ReglaFalsaPage,
    PuntoFijoPage,
    NewtonPage,
    SecantePage,
    RaicesMultiplesPage,
    GaussSimplePage,
    GaussPivParcialPage,
    GaussPivTotalPage,
    FactorizacionSimplePage,
    FactorizacionParcialPage,
    CroutPage,
    DoolittlePage,
    CholeskyPage,
    InterpolacionSistemasDeEcPage,
    JacobiPage,
    SeidelPage,
    SorPage,
    NewtonDifDivPage,
    InterpolacionSistemasDeEcPage,
    LagrangePage,
    SplinesPage,
    Splines2Page,
    Splines3Page

    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpEcuacionesUnaVariableProvider,
    
  ]
})
export class AppModule {}
