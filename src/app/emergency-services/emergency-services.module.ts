import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmergencyServicesComponent } from './emergency-services.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [EmergencyServicesComponent],
  exports: [EmergencyServicesComponent]
})
export class EmergencyServicesComponentModule {}
