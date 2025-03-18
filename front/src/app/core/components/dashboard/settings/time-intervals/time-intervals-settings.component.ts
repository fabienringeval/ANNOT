import { Component, OnInit, ViewChild } from '@angular/core';
import { TableTimeIntervalsComponent } from 'src/app/shared/components/table/table-time-intervals/table-time-intervals.component';

@Component({
  selector: 'app-time-intervals-settings',
  templateUrl: './time-intervals-settings.component.html',
  styleUrls: ['./time-intervals-settings.component.css']
})
export class TimeIntervalsSettingsComponent implements OnInit {
  @ViewChild(TableTimeIntervalsComponent) tableTimeIntervals;

  constructor() { }

  ngOnInit(): void {}

  reloadTimeIntervalList() {
    this.tableTimeIntervals.loadTimeIntervalList();
  }
}
