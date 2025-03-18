import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { DialogDeleteCompany, DeleteCompanyButtonComponent } from './delete-company-button.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromDeletingCompany from './store';


@NgModule({
  entryComponents: [
    DialogDeleteCompany
  ],
  declarations: [
    DeleteCompanyButtonComponent,
    DialogDeleteCompany
  ],
  exports: [
    DeleteCompanyButtonComponent
  ],
  imports: [
    SharedModule,
    MatDialogModule,
    StoreModule.forFeature(fromDeletingCompany.featureName, fromDeletingCompany.reducer),
    EffectsModule.forFeature([fromDeletingCompany.DeleteCompanyEffects])
  ]
})
export class DeleteCompanyButtonModule { }
