import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpRoutingModule } from './help-routing.module';
import { HelpHomepageComponent } from './help-homepage/help-homepage.component';


@NgModule({
  declarations: [HelpHomepageComponent],
  imports: [
    CommonModule,
    HelpRoutingModule
  ]
})
export class HelpModule { }
