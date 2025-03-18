import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCampaignUsersComponent } from './table-campaign-users.component';

describe('TableCampaignUsersComponent', () => {
  let component: TableCampaignUsersComponent;
  let fixture: ComponentFixture<TableCampaignUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableCampaignUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCampaignUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
