import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTimeIntervalsComponent } from './table-time-intervals.component';

describe('TableTimeIntervalsComponent', () => {
  let component: TableTimeIntervalsComponent;
  let fixture: ComponentFixture<TableTimeIntervalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableTimeIntervalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableTimeIntervalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
