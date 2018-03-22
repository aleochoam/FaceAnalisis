import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the HttpPuntoFijoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpPuntoFijoProvider {

  private apiUrl = '';
  
  constructor(public http: HttpClient) {
    console.log('Hello HttpPuntoFijoProvider Provider');
  }

  public getPuntoFijo() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }


  public postPuntoFijo(data) {
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
