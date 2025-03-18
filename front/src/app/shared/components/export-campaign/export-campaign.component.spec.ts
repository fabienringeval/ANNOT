import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportCampaignComponent } from './export-campaign.component';

describe('ExportCampaignComponent', () => {
  let component: ExportCampaignComponent;
  let fixture: ComponentFixture<ExportCampaignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportCampaignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
