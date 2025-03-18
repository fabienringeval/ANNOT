import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCampaignsComponent } from './table-campaigns.component';

describe('TableCampaignsComponent', () => {
  let component: TableCampaignsComponent;
  let fixture: ComponentFixture<TableCampaignsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableCampaignsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCampaignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
