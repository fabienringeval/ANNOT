import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUsersButtonComponent } from './add-users-button.component';

describe('AddUsersButtonComponent', () => {
  let component: AddUsersButtonComponent;
  let fixture: ComponentFixture<AddUsersButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUsersButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUsersButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
