import { Component, OnInit, ViewChild } from '@angular/core';
import { TableCompaniesComponent } from 'src/app/shared/components/table/table-companies/table-companies.component';

@Component({
  selector: 'app-companies-settings',
  templateUrl: './companies-settings.component.html',
  styleUrls: ['./companies-settings.component.css']
})
export class CompaniesSettingsComponent implements OnInit {
  @ViewChild(TableCompaniesComponent) tableCompanies;

  constructor() { }

  ngOnInit(): void {}

  reloadCompanyList() {
    this.tableCompanies.loadCompanyList();
  }
}
