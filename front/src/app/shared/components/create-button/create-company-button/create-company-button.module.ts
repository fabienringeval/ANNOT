import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { DialogCreateCompany, CreateCompanyButtonComponent } from './create-company-button.component';
import { CompanyCreateModule } from '../../form/company-create/company-create.module';


@NgModule({
  entryComponents: [
    DialogCreateCompany
  ],
  declarations: [
    CreateCompanyButtonComponent,
    DialogCreateCompany
  ],
  exports: [
    CreateCompanyButtonComponent
  ],
  imports: [
    SharedModule,
    MatDialogModule,
    CompanyCreateModule
  ]
})
export class CreateCompanyButtonModule { }
