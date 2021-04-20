import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { EmergencyServicesComponent } from './emergency-services.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [EmergencyServicesComponent],
  exports: [EmergencyServicesComponent],
  providers: [Geolocation]
})
export class EmergencyServicesComponentModule {}
