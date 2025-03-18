import { Component, OnInit, ViewChild } from '@angular/core';
import { TableProfilesComponent } from 'src/app/shared/components/table/table-profiles/table-profiles.component';

@Component({
  selector: 'app-profiles-settings',
  templateUrl: './profiles-settings.component.html',
  styleUrls: ['./profiles-settings.component.css']
})
export class ProfilesSettingsComponent implements OnInit {
  @ViewChild(TableProfilesComponent) tableProfiles;

  constructor() { }

  ngOnInit(): void {}

  reloadProfileList() {
    this.tableProfiles.loadProfileList();
  }
}
