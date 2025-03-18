import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignsAnnotationComponent } from './campaigns-annotation.component';

describe('CampaignsAnnotationComponent', () => {
  let component: CampaignsAnnotationComponent;
  let fixture: ComponentFixture<CampaignsAnnotationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignsAnnotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignsAnnotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
