import { NgModule } from '@angular/core';
import { TimeIntervalCreateComponent } from './time-interval-create.component';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { SharedModule } from 'src/app/shared/shared.module';
import * as fromCreateTimeInterval from './store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';


@NgModule({
  declarations: [TimeIntervalCreateComponent],
  exports : [TimeIntervalCreateComponent],
  imports: [
    SharedModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    StoreModule.forFeature(fromCreateTimeInterval.featureName, fromCreateTimeInterval.reducer),
    EffectsModule.forFeature([fromCreateTimeInterval.CreateTimeIntervalEffects])
  ]
})
export class TimeIntervalCreateModule { }
