import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AngularFireDatabase } from '@angular/fire/database';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-emergency-services',
  templateUrl: './emergency-services.component.html',
  styleUrls: ['./emergency-services.component.scss'],
})
export class EmergencyServicesComponent implements OnInit {

  longitude;
  latitude;

  constructor(
    private callNumber: CallNumber,
    private geolocation: Geolocation,
    private database: AngularFireDatabase,
    private storage: Storage) { }

  async ngOnInit() {
    await this.storage.create();
  }

  callNow(numberToCall: string) {

    this.getUserLocation();

    this.callNumber.callNumber(numberToCall, true)
      .then(result => console.log('Launched dialer!', result))
      .catch(error => console.log('Error launching dialer', error));
  }

  getUserLocation() {

    console.log('Getting location');

    this.geolocation.getCurrentPosition().then((response) => {
      this.latitude = response.coords.latitude;
      this.longitude = response.coords.longitude;

      this.sendUserDetails(this.latitude, this.longitude);

      console.log('latitude', this.latitude);
      console.log('longitude', this.longitude);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  async sendUserDetails(longitude: string, latitude: string) {

    const userDetails = await this.storage.get('userDetails');

    userDetails.location = [longitude, latitude];

    console.log('Saving user details', userDetails);

    this.database.object('cases').set({ userDetails });
  }
}
