import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeIntervalCreateComponent } from './time-interval-create.component';

describe('TimeIntervalCreateComponent', () => {
  let component: TimeIntervalCreateComponent;
  let fixture: ComponentFixture<TimeIntervalCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeIntervalCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeIntervalCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
