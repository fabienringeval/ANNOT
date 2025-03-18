import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import * as _ from 'underscore';

@Component({
  selector: 'app-emotion-graph',
  templateUrl: './emotion-graph.component.html',
  styleUrls: ['./emotion-graph.component.css']
})
export class EmotionGraphComponent implements OnInit, OnDestroy {
  @Input() annotations: { timestamp: number, value: number }[];

  lineChartData: ChartDataSets[] = [
    { data: [], label: 'data' }
  ];

  lineChartLabels: Label[] = [];

  constructor() {}

  ngOnInit(): void {
    let chartValue = [];
    let chartLabel = [];

    this.annotations.forEach( function(item) {
      chartValue.push(item.value);
      chartLabel.push(item.timestamp);
    });

    this.lineChartData = [
      { data: chartValue, label: 'data' }
    ];
    
    this.lineChartLabels = chartLabel;
  }

  ngOnDestroy(): void {}
}
