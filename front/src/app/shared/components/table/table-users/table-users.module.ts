import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableUsersComponent } from './table-users.component';

import { MatTableModule } from '@angular/material/table';
import { PaginatorModule } from '../../paginator/paginator.module';
import { LoadingModule } from 'src/app/shared/components/loading/loading.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromLoadUserList from './store';


@NgModule({
  declarations: [TableUsersComponent],
  exports : [TableUsersComponent],
  imports: [
    CommonModule,
    MatTableModule,
    PaginatorModule,
    LoadingModule,
    StoreModule.forFeature(fromLoadUserList.featureName, fromLoadUserList.reducer),
    EffectsModule.forFeature([fromLoadUserList.LoadUserListEffects])
  ]
})
export class TableUsersModule { }
