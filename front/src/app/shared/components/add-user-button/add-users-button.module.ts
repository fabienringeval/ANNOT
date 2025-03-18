import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { DialogAddUsers, AddUsersButtonComponent } from './add-users-button.component';
import { UserAddModule } from '../form/users/user-add/user-add.module';


@NgModule({
  entryComponents: [
    DialogAddUsers
  ],
  declarations: [
    AddUsersButtonComponent,
    DialogAddUsers
  ],
  exports: [
    AddUsersButtonComponent
  ],
  imports: [
    SharedModule,
    MatDialogModule,
    UserAddModule
  ]
})
export class AddUsersButtonModule { }
