import { NgModule } from '@angular/core';
import { TableProfilesComponent } from './table-profiles.component';
import { LoadingModule } from 'src/app/shared/components/loading/loading.module';
import { PaginatorModule } from 'src/app/shared/components/paginator/paginator.module';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromLoadProfileList from './store'
import { DeleteProfileButtonModule } from '../../delete-button/delete-profile-button/delete-profile-button.module';


@NgModule({
  declarations: [TableProfilesComponent],
  exports: [TableProfilesComponent],
  imports: [
    SharedModule,
    MatTableModule,
    LoadingModule,
    PaginatorModule,
    DeleteProfileButtonModule,
    MatChipsModule,
    StoreModule.forFeature(fromLoadProfileList.featureName, fromLoadProfileList.reducer),
    EffectsModule.forFeature([fromLoadProfileList.LoadProfileListEffects])
  ]
})
export class TableProfilesModule { }
