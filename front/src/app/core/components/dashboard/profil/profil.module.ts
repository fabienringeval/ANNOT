import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilRoutingModule } from './profil-routing.module';
import { ProfilHomepageComponent } from './profil-homepage/profil-homepage.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [ProfilHomepageComponent],
  imports: [
    CommonModule,
    ProfilRoutingModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class ProfilModule { }
