import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmotionAnnotatorComponent } from './emotion-annotator.component';

describe('EmotionAnnotatorComponent', () => {
  let component: EmotionAnnotatorComponent;
  let fixture: ComponentFixture<EmotionAnnotatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmotionAnnotatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmotionAnnotatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
