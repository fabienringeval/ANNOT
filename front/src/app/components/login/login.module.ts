import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
    declarations: [LoginComponent],
    imports: [
      SharedModule,
      LoginRoutingModule,
      MatFormFieldModule,
      MatCheckboxModule,
      MatInputModule,
      MatButtonModule
    ]
  })

export class LoginModule {}