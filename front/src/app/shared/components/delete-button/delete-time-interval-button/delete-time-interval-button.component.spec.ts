import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTimeIntervalButtonComponent } from './delete-time-interval-button.component';

describe('DeleteTimeIntervalButtonComponent', () => {
  let component: DeleteTimeIntervalButtonComponent;
  let fixture: ComponentFixture<DeleteTimeIntervalButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteTimeIntervalButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTimeIntervalButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
