import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading.component';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [LoadingComponent],
  exports: [LoadingComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ]
})
export class LoadingModule { }
