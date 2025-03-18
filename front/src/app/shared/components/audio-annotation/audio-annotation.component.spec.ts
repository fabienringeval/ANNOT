import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioAnnotationComponent } from './audio-annotation.component';

describe('AudioAnnotationComponent', () => {
  let component: AudioAnnotationComponent;
  let fixture: ComponentFixture<AudioAnnotationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioAnnotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioAnnotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
