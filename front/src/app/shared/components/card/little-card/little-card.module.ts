import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LittleCardComponent } from './little-card/little-card.component';



@NgModule({
  declarations: [LittleCardComponent],
  exports: [
    LittleCardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LittleCardModule { }
