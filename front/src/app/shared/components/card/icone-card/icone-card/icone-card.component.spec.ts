import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconeCardComponent } from './icone-card.component';

describe('IconeCardComponent', () => {
  let component: IconeCardComponent;
  let fixture: ComponentFixture<IconeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconeCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
