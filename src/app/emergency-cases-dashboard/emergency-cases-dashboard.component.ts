import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-emergency-cases-dashboard',
  templateUrl: './emergency-cases-dashboard.component.html',
  styleUrls: ['./emergency-cases-dashboard.component.scss'],
})
export class EmergencyCasesDashboardComponent implements OnInit {

  items: Observable<any[]>;
  xxx: any;

  constructor(private database: AngularFireDatabase) { }

  ngOnInit() { }

  getReportedCases(): any {
    console.log("Getting reported cases");

    this.items = this.database.list('/cases').valueChanges()

    this.items.subscribe(valueOfItems => {
      console.log(valueOfItems);
      this.xxx = valueOfItems;
    });
  };
}
