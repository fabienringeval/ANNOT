import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { IconeCardModule } from 'src/app/shared/components/card/icone-card/icone-card.module';


@NgModule({
  declarations: [HomepageComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    IconeCardModule
  ]
})
export class HomeModule { }
