import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioProfilesComponent } from './audio-profiles.component';

describe('AudioProfilesComponent', () => {
  let component: AudioProfilesComponent;
  let fixture: ComponentFixture<AudioProfilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioProfilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
