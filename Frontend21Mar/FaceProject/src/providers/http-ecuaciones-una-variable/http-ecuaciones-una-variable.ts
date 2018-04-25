import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the HttpEcuacionesUnaVariableProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpEcuacionesUnaVariableProvider {

  constructor(public http: HttpClient) {
    console.log('Hello HttpEcuacionesUnaVariableProvider Provider');
  }

  public get(apiUrl) {
    return new Promise(resolve => {
      this.http.get(apiUrl).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }


  public post(data, apiUrl) {
    return (new Promise((resolve, reject) => {
    this.http.post(apiUrl, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    }));
  }

}
