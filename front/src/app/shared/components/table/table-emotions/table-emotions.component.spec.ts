import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableEmotionsComponent } from './table-emotions.component';

describe('TableEmotionsComponent', () => {
  let component: TableEmotionsComponent;
  let fixture: ComponentFixture<TableEmotionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableEmotionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableEmotionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
