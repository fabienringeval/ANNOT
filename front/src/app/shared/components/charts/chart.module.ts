import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './chart.component';

import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [ChartComponent],
  exports: [ ChartComponent ],
  imports: [
    CommonModule,
    ChartsModule
  ]
})
export class ChartModule { }
