import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignsSheetExportComponent } from './campaigns-sheet-export.component';

describe('CampaignsSheetExportComponent', () => {
  let component: CampaignsSheetExportComponent;
  let fixture: ComponentFixture<CampaignsSheetExportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignsSheetExportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignsSheetExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
