import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableAudiosComponent } from './table-audios.component';

describe('TableAudiosComponent', () => {
  let component: TableAudiosComponent;
  let fixture: ComponentFixture<TableAudiosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableAudiosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableAudiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
