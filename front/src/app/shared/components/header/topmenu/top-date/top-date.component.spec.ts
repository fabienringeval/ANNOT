import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopDateComponent } from './top-date.component';

describe('TopDateComponent', () => {
  let component: TopDateComponent;
  let fixture: ComponentFixture<TopDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
