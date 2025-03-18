import { NgModule } from '@angular/core';
import { TableCompaniesComponent } from './table-companies.component';
import { LoadingModule } from 'src/app/shared/components/loading/loading.module';
import { PaginatorModule } from 'src/app/shared/components/paginator/paginator.module';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromLoadCompanyList from './store';
import { DeleteCompanyButtonModule } from 'src/app/shared/components/delete-button/delete-company-button/delete-company-button.module';

@NgModule({
  declarations: [TableCompaniesComponent],
  exports: [TableCompaniesComponent],
  imports: [
    SharedModule,
    MatTableModule,
    LoadingModule,
    PaginatorModule,
    DeleteCompanyButtonModule,
    StoreModule.forFeature(fromLoadCompanyList.featureName, fromLoadCompanyList.reducer),
    EffectsModule.forFeature([fromLoadCompanyList.LoadCompanyListEffects])
  ]
})
export class TableCompaniesModule { }
