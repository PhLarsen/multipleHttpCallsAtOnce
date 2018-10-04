import { Component } from '@angular/core';
import { Platform, AlertController, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';
import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private alertCtrl: AlertController, private network: Network, private toastCtrl: ToastController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  public disconnectSubscription() { 
    this.network.onDisconnect().subscribe(() => {
    console.log('network was disconnected :-(');
  });
}



  public connectSubscription() {

   this.network.onConnect().subscribe(() => {
    console.log('network connected!');
    // We just got a connection but we need to wait briefly
     // before we determine the connection type. Might need to wait.
    // prior to doing any api requests as well.
    setTimeout(() => {
      if (this.network.type === 'wifi') {
        console.log('we got a wifi connection, woohoo!');
      }
    }, 3000);
  });
  }

  

  private listenDisconnected():void{
    this.network.onDisconnect().subscribe(()=> {
      this.showDisconnectAlert();
    })
  }

  private listenConnected():void{
    this.network.onConnect().subscribe(() => {
      // Need to wait a bit before trusting that the connection is stable.
      setTimeout(() => {
        this.toastCtrl.create({
          message: "Du er connected!",
          duration: 3000
        }).present();
      },3000);
      
    })
  }

  private showDisconnectAlert():void{
    let alert = this.alertCtrl.create({
      title: "Ingen internetforbindelse",
      message: "Du har mistet forbindelsen til internettet.",
      buttons: [
        {
          text: "Luk",
          role: "cancel",
          handler: () => {
            console.log("Cancel pressed");
          }
        }, {
          text: "OK",
          handler: ()=>{
            console.log("Ok funktionalitet");
          }
        }
      ]
    });
    alert.present();
  }
  private showConnectedAlert():void{
    let alert = this.alertCtrl.create({
      title: "Du har igen forbindelse til internettet",
      buttons: [
        {
          text: "Luk",
          role: "cancel",
          handler: () => {
            console.log("Cancel pressed");
          }
        }, {
          text: "OK",
          handler: ()=>{
            console.log("Ok funktionalitet");
          }
        }
      ]
    });
    alert.present();
  }
  
}

