import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableCampaignsInfoComponent } from './table-campaigns-info.component';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [TableCampaignsInfoComponent],
  exports: [TableCampaignsInfoComponent],
  imports: [
    CommonModule,
    MatTableModule
  ]
})
export class TableCampaignsInfoModule { }
