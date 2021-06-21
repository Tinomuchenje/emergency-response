import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-personal-emergency-details',
  templateUrl: './personal-emergency-details.component.html',
  styleUrls: ['./personal-emergency-details.component.scss'],
})
export class PersonalEmergencyDetailsComponent implements OnInit {

  constructor(private storage: Storage) { }

  async ngOnInit() {
    await this.storage.create();
  }

  async savePersonalDetails(user: any) {
    console.log('Saving personal details')
    await this.storage.set('userDetails', user);
  }
}
