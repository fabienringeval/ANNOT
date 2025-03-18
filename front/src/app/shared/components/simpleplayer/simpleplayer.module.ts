import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleplayerComponent } from './simpleplayer.component';



@NgModule({
  declarations: [SimpleplayerComponent],
  exports: [SimpleplayerComponent],
  imports: [
    CommonModule
  ]
})
export class SimpleplayerModule { }
