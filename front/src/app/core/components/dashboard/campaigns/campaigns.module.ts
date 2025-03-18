import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

// routing
import { CampaignsRoutingModule } from './campaigns-routing.module';

// modules
import { TableCampaignsModule } from 'src/app/shared/components/table/table-campaigns/table-campaigns.module';
import { CampaignsCreateModule } from 'src/app/shared/components/form/campaigns/campaigns-create/campaigns-create.module';
import { MatButtonModule } from '@angular/material/button';
import { IconeCardModule } from 'src/app/shared/components/card/icone-card/icone-card.module';

// components
import { CampaignsHomepageComponent } from './campaigns-homepage/campaigns-homepage.component';
import { CampaignsCreateComponent } from './campaigns-create/campaigns-create.component';
import { CampaignsAnnotationComponent } from './campaigns-annotation/campaigns-annotation.component';

// Shared components
import { AudioAnnotationModule } from 'src/app/shared/components/audio-annotation/audio-annotation.module';
import { AudioListModule } from 'src/app/shared/components/audio-list/audio-list.module';

@NgModule({
  declarations: [
    CampaignsHomepageComponent,
    CampaignsCreateComponent,
    CampaignsAnnotationComponent
  ],
  imports: [
    SharedModule,
    CampaignsRoutingModule,
    TableCampaignsModule,
    CampaignsCreateModule,
    MatButtonModule,
    AudioAnnotationModule,
    AudioListModule,
    IconeCardModule
  ]
})

export class CampaignsModule { }