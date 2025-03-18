import { NgModule } from '@angular/core';
import { ProfileCreateComponent } from './profile-create.component';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { SharedModule } from 'src/app/shared/shared.module';
import * as fromCreateProfile from './store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [ProfileCreateComponent],
  exports : [ProfileCreateComponent],
  imports: [
    SharedModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    StoreModule.forFeature(fromCreateProfile.featureName, fromCreateProfile.reducer),
    EffectsModule.forFeature([fromCreateProfile.CreateProfileEffects])
  ]
})
export class ProfileCreateModule { }
