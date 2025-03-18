import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconeCardComponent } from './icone-card/icone-card.component';



@NgModule({
  declarations: [IconeCardComponent],
  exports : [IconeCardComponent],
  imports: [
    CommonModule
  ]
})
export class IconeCardModule { }
