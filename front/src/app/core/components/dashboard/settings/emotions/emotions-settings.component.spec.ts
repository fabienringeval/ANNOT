import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmotionsSettingsComponent } from './emotions-settings.component';

describe('EmotionsSettingsComponent', () => {
  let component: EmotionsSettingsComponent;
  let fixture: ComponentFixture<EmotionsSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmotionsSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmotionsSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
