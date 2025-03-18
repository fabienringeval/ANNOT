import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCampaignsInfoComponent } from './table-campaigns-info.component';

describe('TableCampaignsInfoComponent', () => {
  let component: TableCampaignsInfoComponent;
  let fixture: ComponentFixture<TableCampaignsInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableCampaignsInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCampaignsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
