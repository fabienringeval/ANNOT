import { NgModule } from '@angular/core';
import { UsersRoutingModule } from './users-routing.module';
import { UserHomepageComponent } from './user-homepage/user-homepage.component';
import { TableUsersModule } from 'src/app/shared/components/table/table-users/table-users.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateUserButtonModule } from 'src/app/shared/components/create-button/create-user-button/create-user-button.module';


@NgModule({
  declarations: [
    UserHomepageComponent
  ],
  imports: [
    SharedModule,
    UsersRoutingModule,
    TableUsersModule,
    CreateUserButtonModule
  ]
})
export class UsersModule { }
