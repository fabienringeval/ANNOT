import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTimeIntervalButtonComponent } from './create-time-interval-button.component';

describe('CreateTimeIntervalButtonComponent', () => {
  let component: CreateTimeIntervalButtonComponent;
  let fixture: ComponentFixture<CreateTimeIntervalButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTimeIntervalButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTimeIntervalButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
