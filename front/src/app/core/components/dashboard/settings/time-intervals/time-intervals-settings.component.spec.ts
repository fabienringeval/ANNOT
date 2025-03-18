import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeIntervalsSettingsComponent } from './time-intervals-settings.component';

describe('TimeIntervalsSettingsComponent', () => {
  let component: TimeIntervalsSettingsComponent;
  let fixture: ComponentFixture<TimeIntervalsSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeIntervalsSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeIntervalsSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
