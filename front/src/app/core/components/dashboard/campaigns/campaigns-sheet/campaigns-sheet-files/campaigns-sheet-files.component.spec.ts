import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignsSheetFilesComponent } from './campaigns-sheet-files.component';

describe('CampaignsSheetFilesComponent', () => {
  let component: CampaignsSheetFilesComponent;
  let fixture: ComponentFixture<CampaignsSheetFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignsSheetFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignsSheetFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
