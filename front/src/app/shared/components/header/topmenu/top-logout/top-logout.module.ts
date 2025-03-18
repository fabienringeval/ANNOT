import { NgModule } from '@angular/core';
import { TopLogoutComponent } from './top-logout.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromLogout from './store';

@NgModule({
  declarations: [TopLogoutComponent],
  exports: [TopLogoutComponent],
  imports: [
    SharedModule,
    MatButtonModule,
    MatIconModule,
    StoreModule.forFeature(fromLogout.featureName, fromLogout.reducer),
    EffectsModule.forFeature([fromLogout.LogoutEffects])
  ]
})
export class TopLogoutModule { }
