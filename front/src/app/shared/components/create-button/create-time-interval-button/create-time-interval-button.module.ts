import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { DialogCreateTimeInterval, CreateTimeIntervalButtonComponent } from './create-time-interval-button.component';
import { TimeIntervalCreateModule } from '../../form/time-interval-create/time-interval-create.module';


@NgModule({
  entryComponents: [
    DialogCreateTimeInterval
  ],
  declarations: [
    CreateTimeIntervalButtonComponent,
    DialogCreateTimeInterval
  ],
  exports: [
    CreateTimeIntervalButtonComponent
  ],
  imports: [
    SharedModule,
    MatDialogModule,
    TimeIntervalCreateModule
  ]
})
export class CreateTimeIntervalButtonModule { }
