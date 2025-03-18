import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { DialogDeleteTimeInterval, DeleteTimeIntervalButtonComponent } from './delete-time-interval-button.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromDeletingTimeInterval from './store';


@NgModule({
  entryComponents: [
    DialogDeleteTimeInterval
  ],
  declarations: [
    DeleteTimeIntervalButtonComponent,
    DialogDeleteTimeInterval
  ],
  exports: [
    DeleteTimeIntervalButtonComponent
  ],
  imports: [
    SharedModule,
    MatDialogModule,
    StoreModule.forFeature(fromDeletingTimeInterval.featureName, fromDeletingTimeInterval.reducer),
    EffectsModule.forFeature([fromDeletingTimeInterval.DeleteTimeIntervalEffects])
  ]
})
export class DeleteTimeIntervalButtonModule { }
