import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { DialogCreateUser, CreateUserButtonComponent } from './create-user-button.component';
import { UserCreateModule } from '../../form/users/user-create/user-create.module';


@NgModule({
  entryComponents: [
    DialogCreateUser
  ],
  declarations: [
    CreateUserButtonComponent,
    DialogCreateUser
  ],
  exports: [
    CreateUserButtonComponent
  ],
  imports: [
    SharedModule,
    MatDialogModule,
    UserCreateModule
  ]
})
export class CreateUserButtonModule { }
