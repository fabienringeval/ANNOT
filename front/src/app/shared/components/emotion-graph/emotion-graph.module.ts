import { NgModule } from '@angular/core';
import { EmotionGraphComponent } from './emotion-graph.component';
import { SharedModule } from '../../shared.module';
import { ChartModule } from '../charts/chart.module';


@NgModule({
  declarations: [EmotionGraphComponent],
  exports: [EmotionGraphComponent],
  imports: [
    SharedModule,
    ChartModule
  ]
})
export class EmotionGraphModule { }
