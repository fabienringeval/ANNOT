import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableCampaignUsersComponent } from './table-campaign-users.component';

import { MatTableModule } from '@angular/material/table';
import { PaginatorModule } from '../../paginator/paginator.module';
import { LoadingModule } from 'src/app/shared/components/loading/loading.module';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromLoadUserList from './store';
import { AddUsersButtonModule } from '../../add-users-button/add-users-button.module';


@NgModule({
  declarations: [TableCampaignUsersComponent],
  exports : [TableCampaignUsersComponent],
  imports: [
    CommonModule,
    MatTableModule,
    PaginatorModule,
    LoadingModule,
    ButtonModule,
    AddUsersButtonModule,
    StoreModule.forFeature(fromLoadUserList.featureName, fromLoadUserList.reducer),
    EffectsModule.forFeature([fromLoadUserList.LoadCampaignUserListEffects])
  ]
})
export class TableCampaignUsersModule { }
