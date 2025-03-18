import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpHomepageComponent } from './help-homepage.component';

describe('HelpHomepageComponent', () => {
  let component: HelpHomepageComponent;
  let fixture: ComponentFixture<HelpHomepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpHomepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
