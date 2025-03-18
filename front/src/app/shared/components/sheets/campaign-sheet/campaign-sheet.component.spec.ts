import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignSheetComponent } from './campaign-sheet.component';

describe('CampaignSheetComponent', () => {
  let component: CampaignSheetComponent;
  let fixture: ComponentFixture<CampaignSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
