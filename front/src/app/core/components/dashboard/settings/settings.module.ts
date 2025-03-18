import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

// routing
import { SettingsRoutingModule } from './settings-routing.module';

// components
import { CompaniesSettingsComponent } from './companies/companies-settings.component';
import { EmotionsSettingsComponent } from './emotions/emotions-settings.component';
import { ProfilesSettingsComponent } from './profiles/profiles-settings.component';
import { TimeIntervalsSettingsComponent } from './time-intervals/time-intervals-settings.component';

// Shared components
import { TableEmotionsModule } from 'src/app/shared/components/table/table-emotions/table-emotions.module';
import { TableTimeIntervalsModule } from 'src/app/shared/components/table/table-time-intervals/table-time-intervals.module';
import { TableCompaniesModule } from 'src/app/shared/components/table/table-companies/table-companies.module';
import { TableProfilesModule } from 'src/app/shared/components/table/table-profiles/table-profiles.module';
import { CreateEmotionButtonModule } from 'src/app/shared/components/create-button/create-emotion-button/create-emotion-button.module';
import { CreateTimeIntervalButtonModule } from 'src/app/shared/components/create-button/create-time-interval-button/create-time-interval-button.module';
import { CreateCompanyButtonModule } from 'src/app/shared/components/create-button/create-company-button/create-company-button.module';
import { CreateProfileButtonModule } from 'src/app/shared/components/create-button/create-profile-button/create-profile-button.module';

@NgModule({
  declarations: [
    CompaniesSettingsComponent,
    EmotionsSettingsComponent,
    ProfilesSettingsComponent,
    TimeIntervalsSettingsComponent
  ],
  imports: [
    SharedModule,
    SettingsRoutingModule,
    TableEmotionsModule,
    CreateEmotionButtonModule,
    TableTimeIntervalsModule,
    CreateTimeIntervalButtonModule,
    TableCompaniesModule,
    CreateCompanyButtonModule,
    TableProfilesModule,
    CreateProfileButtonModule
  ]
})

export class SettingsModule { }
