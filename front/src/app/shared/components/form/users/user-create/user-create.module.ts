import { NgModule } from '@angular/core';
import { UserCreateComponent } from './user-create.component';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { SharedModule } from 'src/app/shared/shared.module';
import * as fromCreateUser from './store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';


@NgModule({
  declarations: [UserCreateComponent],
  exports : [UserCreateComponent],
  imports: [
    SharedModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    StoreModule.forFeature(fromCreateUser.featureName, fromCreateUser.reducer),
    EffectsModule.forFeature([fromCreateUser.CreateUserEffects])
  ]
})
export class UserCreateModule { }
