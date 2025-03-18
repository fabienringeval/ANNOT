import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompaniesSettingsComponent } from './companies/companies-settings.component';
import { EmotionsSettingsComponent} from './emotions/emotions-settings.component';
import { ProfilesSettingsComponent } from './profiles/profiles-settings.component';
import { TimeIntervalsSettingsComponent } from './time-intervals/time-intervals-settings.component';

const routes: Routes = [
  { path: 'companies', component: CompaniesSettingsComponent },
  { path: 'dimensions', component: EmotionsSettingsComponent },
  { path: 'categories', component: ProfilesSettingsComponent },
  { path: 'time-intervals', component: TimeIntervalsSettingsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
