import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { DialogCreateProfile, CreateProfileButtonComponent } from './create-profile-button.component';
import { ProfileCreateModule } from '../../form/profile-create/profile-create.module';


@NgModule({
  entryComponents: [
    DialogCreateProfile
  ],
  declarations: [
    CreateProfileButtonComponent,
    DialogCreateProfile
  ],
  exports: [
    CreateProfileButtonComponent
  ],
  imports: [
    SharedModule,
    MatDialogModule,
    ProfileCreateModule
  ]
})
export class CreateProfileButtonModule { }
