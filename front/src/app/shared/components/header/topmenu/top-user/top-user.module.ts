import { NgModule } from '@angular/core';
import { TopUserComponent } from './top-user.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromTopUser from './store'
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
  declarations: [TopUserComponent],
  exports: [TopUserComponent],
  imports: [
    SharedModule,
    MatMenuModule,
    StoreModule.forFeature(fromTopUser.featureName, fromTopUser.reducer),
    EffectsModule.forFeature([fromTopUser.TopUserEffects])
  ]
})
export class TopUserModule { }
