import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the HttpRaicesMultiplesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpRaicesMultiplesProvider {

  private apiUrl = 'http://165.227.197.6:8000/api/newton2/';


  constructor(public http: HttpClient) {
    console.log('Hello HttpRaicesMultiplesProvider Provider');
  }

  public getRaicesMultiples() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }


  public postRaicesMultiples(data) {
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
