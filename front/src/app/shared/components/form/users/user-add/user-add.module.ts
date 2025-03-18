import { NgModule } from '@angular/core';
import { UserAddComponent } from './user-add.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from 'src/app/shared/shared.module';
import * as fromAddUsers from './store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';


@NgModule({
  declarations: [UserAddComponent],
  exports : [UserAddComponent],
  imports: [
    SharedModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    StoreModule.forFeature(fromAddUsers.featureName, fromAddUsers.reducer),
    EffectsModule.forFeature([fromAddUsers.AddUsersEffects])
  ]
})
export class UserAddModule { }
