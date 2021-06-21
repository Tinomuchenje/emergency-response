import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AngularFireDatabase } from '@angular/fire/database';

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
    private database: AngularFireDatabase) { }

  ngOnInit() { }

  callNow(numberToCall: string) {

    this.getUserLocation();

    this.callNumber.callNumber(numberToCall, true)
      .then(result => console.log('Launched dialer!', result))
      .catch(error => console.log('Error launching dialer', error));
  }

  getUserLocation() {

    console.log('Getting location');

    this.saveUserLocation("1", "2");
    this.geolocation.getCurrentPosition().then((response) => {
      this.latitude = response.coords.latitude;
      this.longitude = response.coords.longitude;

      this.saveUserLocation(this.latitude, this.longitude);

      console.log('latitude', this.latitude);
      console.log('longitude', this.longitude);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  saveUserLocation(longitude: string, latitude: string) {
    console.log('Saving location');
    this.database.object('userDetails').set({
      emergencyType: 'Default',
      locationDetails: [longitude, longitude]
    });
  }
}
