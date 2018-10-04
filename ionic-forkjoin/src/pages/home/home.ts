import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import { Network } from '@ionic-native/network';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  data1: any;
  data2: any;
  data3: any;
  data4: any;
  constructor(public navCtrl: NavController, public restApi: RestApiProvider, public loadingCtrl: LoadingController, private network: Network, private toastCtrl: ToastController) {

  }
ionViewDidEnter(){
  this.network.onConnect().subscribe(data =>{ console.log(data); this.displayNetWorkUpdate(data.type);}, error =>  console.log(error));
  this.network.onDisconnect().subscribe(data =>{ console.log(data); this.displayNetWorkUpdate(data.type);}, error => console.log(error));
}
displayNetWorkUpdate(connectionState: string){
  let networkType = this.network.type;
  this.toastCtrl.create({
    message: `You are now ${connectionState} via ${networkType}`,
    duration: 3000
  }).present();
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