import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignsAnnotValidateComponent } from './campaigns-annot-validate.component';

describe('CampaignsAnnotValidateComponent', () => {
  let component: CampaignsAnnotValidateComponent;
  let fixture: ComponentFixture<CampaignsAnnotValidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignsAnnotValidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignsAnnotValidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
