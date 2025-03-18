import { NgModule } from '@angular/core';
import { CampaignsCreateComponent } from './campaigns-create.component';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { SharedModule } from 'src/app/shared/shared.module';
import * as fromLoadAudioList from './store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge'; 


@NgModule({
  declarations: [CampaignsCreateComponent],
  exports : [CampaignsCreateComponent],
  imports: [
    SharedModule,
    MatSelectModule,
    MatSliderModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatSlideToggleModule,
    StoreModule.forFeature(fromLoadAudioList.featureName, fromLoadAudioList.reducer),
    EffectsModule.forFeature([fromLoadAudioList.LoadCampaignEffects])
  ]
})
export class CampaignsCreateModule { }
