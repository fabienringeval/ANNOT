import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignsSheetComponent } from './campaigns-sheet.component';

describe('CampaignsSheetComponent', () => {
  let component: CampaignsSheetComponent;
  let fixture: ComponentFixture<CampaignsSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignsSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignsSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
