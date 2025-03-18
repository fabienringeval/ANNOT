import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignsHomepageComponent } from './campaigns-homepage.component';

describe('CampaignsHomepageComponent', () => {
  let component: CampaignsHomepageComponent;
  let fixture: ComponentFixture<CampaignsHomepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignsHomepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignsHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
