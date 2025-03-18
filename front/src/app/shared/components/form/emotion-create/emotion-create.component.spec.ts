import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmotionCreateComponent } from './emotion-create.component';

describe('EmotionCreateComponent', () => {
  let component: EmotionCreateComponent;
  let fixture: ComponentFixture<EmotionCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmotionCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmotionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
