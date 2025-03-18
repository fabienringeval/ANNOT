import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignsSheetInformationComponent } from './campaigns-sheet-information.component';

describe('CampaignsSheetInformationComponent', () => {
  let component: CampaignsSheetInformationComponent;
  let fixture: ComponentFixture<CampaignsSheetInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignsSheetInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignsSheetInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
