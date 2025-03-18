import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEmotionButtonComponent } from './create-emotion-button.component';

describe('CreateEmotionButtonComponent', () => {
  let component: CreateEmotionButtonComponent;
  let fixture: ComponentFixture<CreateEmotionButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEmotionButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEmotionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
