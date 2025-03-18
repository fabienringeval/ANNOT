import { NgModule } from '@angular/core';
import { CompanyCreateComponent } from './company-create.component';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { SharedModule } from 'src/app/shared/shared.module';
import * as fromCreateCompany from './store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';


@NgModule({
  declarations: [CompanyCreateComponent],
  exports : [CompanyCreateComponent],
  imports: [
    SharedModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    StoreModule.forFeature(fromCreateCompany.featureName, fromCreateCompany.reducer),
    EffectsModule.forFeature([fromCreateCompany.CreateCompanyEffects])
  ]
})
export class CompanyCreateModule { }
