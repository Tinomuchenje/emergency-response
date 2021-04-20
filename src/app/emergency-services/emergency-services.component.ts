import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-emergency-services',
  templateUrl: './emergency-services.component.html',
  styleUrls: ['./emergency-services.component.scss'],
})
export class EmergencyServicesComponent implements OnInit {

  longitude;
  latitude;
  constructor(private callNumber: CallNumber, private geolocation: Geolocation) { }

  ngOnInit() {}

  callNow(numberToCall: string) {

    this.getUserLocation();

    this.callNumber.callNumber(numberToCall, true)
      .then(result => console.log('Launched dialer!', result))
      .catch(error => console.log('Error launching dialer', error));
  }

  getUserLocation(){
    this.geolocation.getCurrentPosition().then((response) => {
      this.latitude = response.coords.latitude;
      this.longitude = response.coords.longitude;
      console.log('latitude',this.latitude);
      console.log('longitude',this.longitude);
     }).catch((error) => {
       console.log('Error getting location', error);
     });

  }
}
