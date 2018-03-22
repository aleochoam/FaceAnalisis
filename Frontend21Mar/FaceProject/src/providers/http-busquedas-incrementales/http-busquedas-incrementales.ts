import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the HttpBusquedasIncrementalesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpBusquedasIncrementalesProvider {

  private apiUrl = 'http://165.227.197.6:8000/api/busquedas/';


  constructor(public http: HttpClient) {
    console.log('Hello HttpBusquedasIncrementalesProvider Provider');
  }


  public getBusquedasIncrementales() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }


  public postBusquedasIncrementales(data) {
    return (new Promise((resolve, reject) => {
    this.http.post(this.apiUrl, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    }));
  }

}
