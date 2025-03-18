import { NgModule } from '@angular/core';

// routing
import { DashboardRoutingModule } from './dashboard-routing.module';

// components
import { DashboardComponent } from './dashboard.component';

// modules
import { TopmenuModule } from 'src/app/shared/components/header/topmenu/topmenu.module';
import { SidebarModule } from 'src/app/shared/components/sidebar/sidebar/sidebar.module';
import { IconeCardModule } from 'src/app/shared/components/card/icone-card/icone-card.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    SharedModule,
    DashboardRoutingModule,
    TopmenuModule,
    SidebarModule,
    IconeCardModule
  ]
})
export class DashboardModule { }
