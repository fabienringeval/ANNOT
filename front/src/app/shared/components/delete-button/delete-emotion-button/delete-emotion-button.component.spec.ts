import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteEmotionButtonComponent } from './delete-emotion-button.component';

describe('DeleteEmotionButtonComponent', () => {
  let component: DeleteEmotionButtonComponent;
  let fixture: ComponentFixture<DeleteEmotionButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteEmotionButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteEmotionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
