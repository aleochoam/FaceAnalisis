import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the HttpNewtonProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpNewtonProvider {


  private apiUrl = '';


  constructor(public http: HttpClient) {
    console.log('Hello HttpNewtonProvider Provider');
  }


  public getNewton() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }


  public postNewton(data) {
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
