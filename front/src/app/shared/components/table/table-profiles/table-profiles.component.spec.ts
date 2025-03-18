import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableProfilesComponent } from './table-profiles.component';

describe('TableProfilesComponent', () => {
  let component: TableProfilesComponent;
  let fixture: ComponentFixture<TableProfilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableProfilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
