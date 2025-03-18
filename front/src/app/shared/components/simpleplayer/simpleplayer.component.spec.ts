import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleplayerComponent } from './simpleplayer.component';

describe('SimpleplayerComponent', () => {
  let component: SimpleplayerComponent;
  let fixture: ComponentFixture<SimpleplayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleplayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
