import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { RestApiProvider } from '../../providers/rest-api/rest-api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  data1: any;
  data2: any;
  data3: any;
  data4: any;
  constructor(public navCtrl: NavController, public restApi: RestApiProvider, public loadingCtrl: LoadingController) {

  }
ionViewWillEnter(){
  this.getData();
}
async getData() {
  const loading = await this.loadingCtrl.create({
    content: 'Loading'
  });
  await loading.present();
  this.restApi.getData()
    .subscribe(res => {
      console.log(res);
      this.data1 = res[0];
      this.data2 = res[1];
      this.data3 = res[2];
      this.data4 = res[3];
      loading.dismiss();
    }, err => {
      console.log(err);
      loading.dismiss();
    });
}
    }