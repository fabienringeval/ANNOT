import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadAudioButtonComponent } from './upload-audio-button.component';

describe('UploadAudioButtonComponent', () => {
  let component: UploadAudioButtonComponent;
  let fixture: ComponentFixture<UploadAudioButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadAudioButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadAudioButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
