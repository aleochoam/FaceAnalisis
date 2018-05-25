import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpEcuacionesUnaVariableProvider } from '../../../providers/http-ecuaciones-una-variable/http-ecuaciones-una-variable';

/**
 * Generated class for the SorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sor',
  templateUrl: 'sor.html',
})
export class SorPage {


  private apiUrl  = 'http://165.227.197.6:8080/api/sor/';
  
  showResult = false;

  datasubmit = {
    A : {},
    b : {},
    x0:{},
  };

  private dataReceivedGet  = {};
  private dataReceivedPost = {};
  matrix: Array<string> = [];
  n: any;
  input: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl : AlertController, public httpEcuacionesUnaVariableProvider: HttpEcuacionesUnaVariableProvider) {
    this.n = '';
    this.datasubmit['A'] = {
      
         "00": 9.1622 , "01" : 0.4505, "02":   0.1067, "03": 0.4314, "04":   0.8530, "05":   0.4173, "06":   0.7803, "07":   0.2348, "08":   0.5470, "09":   0.5470,
         "10": 0.7943 , "11" : 9.0838, "12":   0.9619, "13": 0.9106, "14":   0.6221, "15":   0.0497, "16":   0.3897, "17":   0.3532, "18":   0.2963, "19":   0.7757,
         "20": 0.3112 , "21" : 0.2290, "22":   9.0046, "23": 0.1818, "24":   0.3510, "25":   0.9027, "26":   0.2417, "27":   0.8212, "28":   0.7447, "29":   0.4868,
         "30": 0.5285 , "31" : 0.9133, "32":   0.7749, "33": 9.2638, "34":   0.5132, "35":   0.9448, "36":   0.4039, "37":   0.0154, "38":   0.1890, "39":   0.4359,
         "40": 0.1656 , "41" : 0.1524, "42":   0.8173, "43": 0.1455, "44":   9.4018, "45":   0.4909, "46":   0.0965, "47":   0.0430, "48":   0.6868, "49":   0.4468,
         "50": 0.6020 , "51" : 0.8258, "52":   0.8687, "53": 0.1361, "54":   0.0760, "55":   9.4893, "56":   0.1320, "57":   0.1690, "58":   0.1835, "59":   0.3063,
         "60": 0.2630 , "61" : 0.5383, "62":   0.0844, "63": 0.8693, "64":   0.2399, "65":   0.3377, "66":   9.9421, "67":   0.6491, "68":   0.3685, "69":   0.5085,
         "70": 0.6541 , "71" : 0.9961, "72":   0.3998, "73": 0.5797, "74":   0.1233, "75":   0.9001, "76":   0.9561, "77":   9.7317, "78":   0.6256, "79":   0.5108,
         "80": 0.6892 , "81" : 0.0782, "82":   0.2599, "83": 0.5499, "84":   0.1839, "85":   0.3692, "86":   0.5752, "87":   0.6477, "88":   9.7802, "89":   0.8176,
         "90":10.0000 , "91" : 0.4427, "92":   0.8001, "93": 0.1450, "94":   0.2400, "95":   0.1112, "96":   0.0598, "97":   0.4509, "98":   0.0811, "99":  20.0000};
    this.datasubmit['b'] = {
     "0": 1,
     "1": 1,
     "2": 1,
     "3": 1,
     "4": 1,
     "5": 1,
     "6": 1,
     "7": 1,
     "8": 1,
     "9": 1};

     this.datasubmit['tol'] = "1e-7";
     this.datasubmit['iteraciones'] = "100";
     this.datasubmit['x0'] = {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
      "7": 0,
      "8": 0,
      "9": 0};
      this.datasubmit['w'] = "1.4000";
      this.submitForm();
      this.postServer();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GaussSimplePage');
  }
  createMatrix() {
    this.matrix = [];
    for (let i = 0; i < this.n; i++) {
      this.matrix.push(String(i));
    }
    console.log(this.matrix);
    console.log(this.matrix.length);
  }
  getN() {
    console.log(this.n);
    return this.n;
  }

  submitForm(){
    console.log(this.datasubmit);
  }

  private presentAlert () {
    let alert = this.alertCtrl.create({
      title: '¿Qué debo hacer?',
      subTitle: ` <p>Ingresa los siguientes datos:</p>
                  <ul>
                    <li> <b>Dimensión:</b> Cantidad de variables a evaluar</li>
                    <li> <b>Matriz:</b> Coeficientes de las variables a evaluar</li>
                    <li><b>b:</b> Vector b de la ecuación Ax = b</li>
                  </ul>`,
      buttons: ['OK']
    });
    alert.present();
  }
  //Zona de Get y Post

  public getServer() {
    this.httpEcuacionesUnaVariableProvider.get(this.apiUrl)
    .then(data => {
      this.dataReceivedGet = data;
    }, (err) => {
      console.log(err);
    });
  }

  private results(){

  }

  public postServer() {
    this.httpEcuacionesUnaVariableProvider.post(this.datasubmit, this.apiUrl)
    .then(result => {
      this.dataReceivedPost = result;
      this.showResult = true;
      this.results();
      console.log(this.dataReceivedPost);
    }, (err) => {
      console.log(err);
    });
  }

}
