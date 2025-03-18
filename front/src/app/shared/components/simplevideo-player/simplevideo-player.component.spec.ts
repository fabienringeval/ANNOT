import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimplevideoPlayerComponent } from './simplevideo-player.component';

describe('SimplevideoPlayerComponent', () => {
  let component: SimplevideoPlayerComponent;
  let fixture: ComponentFixture<SimplevideoPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimplevideoPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimplevideoPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
