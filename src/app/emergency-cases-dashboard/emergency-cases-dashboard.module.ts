import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { RouterModule, Routes } from '@angular/router';
import { EmergencyCasesDashboardComponent } from './emergency-cases-dashboard.component';

const routes: Routes = [
    {
        path: '',
        component: EmergencyCasesDashboardComponent,
    }
];

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule, RouterModule.forChild(routes)],
    declarations: [EmergencyCasesDashboardComponent],
    exports: [EmergencyCasesDashboardComponent],
    providers: []
})

export class EmergencyCasesDashboardComponentModule { }