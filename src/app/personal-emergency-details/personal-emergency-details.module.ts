import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PersonalEmergencyDetailsComponent } from './personal-emergency-details.component'

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule],
    declarations: [PersonalEmergencyDetailsComponent],
    exports: [PersonalEmergencyDetailsComponent],
    providers: []
})

export class PersonalEmergencyDetailsComponentModule { }