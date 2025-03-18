import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioAnnotationSummaryComponent } from './audio-annotation-summary.component';

describe('AudioAnnotationSummaryComponent', () => {
  let component: AudioAnnotationSummaryComponent;
  let fixture: ComponentFixture<AudioAnnotationSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioAnnotationSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioAnnotationSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
