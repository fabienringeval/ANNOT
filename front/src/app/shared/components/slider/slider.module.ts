import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './slider.component';

import {MatSliderModule} from '@angular/material/slider';



@NgModule({
  declarations: [SliderComponent],
  exports : [
    SliderComponent
  ],
  imports: [
    CommonModule,
    MatSliderModule
  ]
})
export class SliderModule { }
