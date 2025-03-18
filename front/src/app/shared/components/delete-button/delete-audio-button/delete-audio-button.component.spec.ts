import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAudioButtonComponent } from './delete-audio-button.component';

describe('DeleteAudioButtonComponent', () => {
  let component: DeleteAudioButtonComponent;
  let fixture: ComponentFixture<DeleteAudioButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteAudioButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAudioButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
