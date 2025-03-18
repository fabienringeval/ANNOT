import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignsSheetUsersComponent } from './campaigns-sheet-users.component';

describe('CampaignsSheetUsersComponent', () => {
  let component: CampaignsSheetUsersComponent;
  let fixture: ComponentFixture<CampaignsSheetUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignsSheetUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignsSheetUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
