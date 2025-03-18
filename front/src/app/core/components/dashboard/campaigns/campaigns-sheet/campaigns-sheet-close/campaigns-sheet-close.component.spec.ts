import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignsSheetCloseComponent } from './campaigns-sheet-close.component';

describe('CampaignsSheetCloseComponent', () => {
  let component: CampaignsSheetCloseComponent;
  let fixture: ComponentFixture<CampaignsSheetCloseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignsSheetCloseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignsSheetCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
