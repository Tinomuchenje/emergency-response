import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-emergency-services',
  templateUrl: './emergency-services.component.html',
  styleUrls: ['./emergency-services.component.scss'],
})
export class EmergencyServicesComponent implements OnInit {

  constructor(private callNumber: CallNumber) { }

  ngOnInit() {}

  callNow(numberToCall: string) {
    this.callNumber.callNumber(numberToCall, true)
      .then(result => console.log('Launched dialer!', result))
      .catch(error => console.log('Error launching dialer', error));
  }

}
