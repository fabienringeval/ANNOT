import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignsSheetDeleteComponent } from './campaigns-sheet-delete.component';

describe('CampaignsSheetDeleteComponent', () => {
  let component: CampaignsSheetDeleteComponent;
  let fixture: ComponentFixture<CampaignsSheetDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignsSheetDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignsSheetDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
