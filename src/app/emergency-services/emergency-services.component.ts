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

  async callNow() {
    var numberToCall = await this.getNearestServiceNumber();

    this.callNumber.callNumber(numberToCall, true)
      .then(result => console.log('Launched dialer!', result))
      .catch(error => console.log('Error launching dialer', error));
  }

  async getUserLocation() {
    console.log('Getting location');

    await this.geolocation.getCurrentPosition().then((response) => {
      this.latitude = response.coords.latitude;
      this.longitude = response.coords.longitude;

      console.log('latitude', this.latitude);
      console.log('longitude', this.longitude);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  async sendUserDetailsToServer(longitude: string, latitude: string) {

    let defaultUser = { 'name': 'Anonymous' };

    const userDetails = await this.storage.get('userDetails') ?? defaultUser;

    userDetails.location = [longitude, latitude];

    console.log('Saving user details', userDetails);

    const casesRef = this.database.list('cases');
    casesRef.push(userDetails);
  }

  async getNearestServiceNumber(): Promise<string> {
    console.log("Getting nearest provider");
    let previousDistance = 0;
    let providerToCall;

    await this.getUserLocation().then(() => {
      this.sendUserDetailsToServer(this.latitude, this.longitude);

      let providers = [
        { 'id': 0, 'zone': 'Malborough', 'lat': 15, 'lon': 30, 'phone_number': 1 },
        { 'id': 1, 'zone': 'Dotito', 'lat': 40, 'lon': 50, 'phone_number': 2 },
        { 'id': 2, 'zone': 'Zengeza', 'lat': 70, 'lon': 80, 'phone_number': 3 },
        { 'id': 3, 'zone': 'Gokwe', 'lat': 5, 'lon': 8, 'phone_number': 4 }
      ];

      providers.forEach(provider => {
        var distance = this.getDistanceFromLatLonInKm(this.latitude, this.longitude, provider.lat, provider.lon);

        console.log(provider);
        console.log('Provider is' + provider + 'distance is ' + distance);

        if (previousDistance === 0) {
          previousDistance = distance;
          providerToCall = provider;
          return;
        }

        if (distance < previousDistance) {
          previousDistance = distance;
          providerToCall = provider;
        };
      });
    });

    console.log('Previous distance', previousDistance);
    console.log('Provider to call', providerToCall);

    return providerToCall.phone_number;
  }

  getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    //https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
    const RadiusOfEarth = 6371; // Radius of the earth in km
    var latitude_difference = this.deg2rad(lat2 - lat1);  // deg2rad below
    var longitude_difference = this.deg2rad(lon2 - lon1);

    var a =
      Math.sin(latitude_difference / 2) * Math.sin(latitude_difference / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(longitude_difference / 2) * Math.sin(longitude_difference / 2);

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    var distance = RadiusOfEarth * c; // Distance in km
    return distance;
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180)
  }

  getCalculateDistance2(lat1: number, long1: number, lat2: number, long2: number) {
    //https://stackoverflow.com/questions/42724400/calculate-distance-between-2-points-using-javascript-api-in-ionic-2
    let p = 0.017453292519943295;    // Math.PI / 180
    let c = Math.cos;
    let a = 0.5 - c((lat1 - lat2) * p) / 2 + c(lat2 * p) * c((lat1) * p) * (1 - c(((long1 - long2) * p))) / 2;
    let dis = (12742 * Math.asin(Math.sqrt(a))); // 2 * R; R = 6371 km
    alert(dis);
    return dis;
  }
}
