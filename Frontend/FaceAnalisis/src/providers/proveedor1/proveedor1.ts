import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

/*
  Generated class for the Proveedor1Provider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Proveedor1Provider {

  constructor(public http: HttpClient) {
    console.log('Hello Proveedor1Provider Provider');
  }

  obtenerDatos(){
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }

}
