import { NgModule } from '@angular/core';
import { TopmenuComponent } from './topmenu.component';
import { TopAlertComponent } from './top-alert/top-alert.component';
import { TopDateComponent } from './top-date/top-date.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { TopLogoutModule } from './top-logout/top-logout.module';
import { MatMenuModule } from '@angular/material/menu';
import { TopUserModule } from './top-user/top-user.module';


@NgModule({
  declarations: [TopmenuComponent, TopAlertComponent, TopDateComponent],
  exports: [TopmenuComponent],
  imports: [
    SharedModule,
    TopLogoutModule,
    MatMenuModule,
    TopUserModule
  ]
})
export class TopmenuModule { }
