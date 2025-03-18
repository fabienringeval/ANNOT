import { NgModule } from '@angular/core';
import { TableTimeIntervalsComponent } from './table-time-intervals.component';
import { LoadingModule } from 'src/app/shared/components/loading/loading.module';
import { PaginatorModule } from 'src/app/shared/components/paginator/paginator.module';
import {MatTableModule} from '@angular/material/table';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromLoadTimeIntervalList from './store'
import { DeleteTimeIntervalButtonModule } from 'src/app/shared/components/delete-button/delete-time-interval-button/delete-time-interval-button.module';


@NgModule({
  declarations: [TableTimeIntervalsComponent],
  exports: [TableTimeIntervalsComponent],
  imports: [
    SharedModule,
    MatTableModule,
    LoadingModule,
    PaginatorModule,
    DeleteTimeIntervalButtonModule,
    StoreModule.forFeature(fromLoadTimeIntervalList.featureName, fromLoadTimeIntervalList.reducer),
    EffectsModule.forFeature([fromLoadTimeIntervalList.LoadTimeIntervalListEffects])
  ]
})
export class TableTimeIntervalsModule { }
