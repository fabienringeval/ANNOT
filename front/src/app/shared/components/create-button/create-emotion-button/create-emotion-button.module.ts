import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { DialogCreateEmotion, CreateEmotionButtonComponent } from './create-emotion-button.component';
import { EmotionCreateModule } from '../../form/emotion-create/emotion-create.module';


@NgModule({
  entryComponents: [
    DialogCreateEmotion
  ],
  declarations: [
    CreateEmotionButtonComponent,
    DialogCreateEmotion
  ],
  exports: [
    CreateEmotionButtonComponent
  ],
  imports: [
    SharedModule,
    MatDialogModule,
    EmotionCreateModule
  ]
})
export class CreateEmotionButtonModule { }
