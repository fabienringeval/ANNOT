import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmotionGraphComponent } from './emotion-graph.component';

describe('EmotionGraphComponent', () => {
  let component: EmotionGraphComponent;
  let fixture: ComponentFixture<EmotionGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmotionGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmotionGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
